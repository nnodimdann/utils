"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Pause, RotateCcw } from "lucide-react"

// Game constants
const GRID_SIZE = 20
const CELL_SIZE = 15
const GAME_SPEED = 100

// Direction constants
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  // Game state refs to avoid dependency issues in useEffect
  const snakeRef = useRef([{ x: 10, y: 10 }])
  const foodRef = useRef({ x: 5, y: 5 })
  const directionRef = useRef(DIRECTIONS.RIGHT)
  const nextDirectionRef = useRef(DIRECTIONS.RIGHT)
  const speedRef = useRef(GAME_SPEED)

  // Generate random food position
  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * GRID_SIZE)
    const y = Math.floor(Math.random() * GRID_SIZE)

    // Make sure food doesn't appear on snake
    const isOnSnake = snakeRef.current.some((segment) => segment.x === x && segment.y === y)
    if (isOnSnake) {
      return generateFood()
    }

    foodRef.current = { x, y }
  }, [])

  // Reset game state
  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }]
    directionRef.current = DIRECTIONS.RIGHT
    nextDirectionRef.current = DIRECTIONS.RIGHT
    speedRef.current = GAME_SPEED
    generateFood()
    setScore(0)
    setGameOver(false)
  }, [generateFood])

  // Start game
  const startGame = useCallback(() => {
    resetGame()
    setGameStarted(true)
    setGamePaused(false)
  }, [resetGame])

  // Toggle pause
  const togglePause = useCallback(() => {
    setGamePaused((prev) => !prev)
  }, [])

  // Handle direction change
  const changeDirection = useCallback((newDirection: typeof DIRECTIONS.UP) => {
    // Prevent 180-degree turns
    const currentDirection = directionRef.current
    if (
      (currentDirection === DIRECTIONS.UP && newDirection === DIRECTIONS.DOWN) ||
      (currentDirection === DIRECTIONS.DOWN && newDirection === DIRECTIONS.UP) ||
      (currentDirection === DIRECTIONS.LEFT && newDirection === DIRECTIONS.RIGHT) ||
      (currentDirection === DIRECTIONS.RIGHT && newDirection === DIRECTIONS.LEFT)
    ) {
      return
    }

    nextDirectionRef.current = newDirection
  }, [])

  // Draw game
  const drawGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw snake
    ctx.fillStyle = "#10b981" // Emerald green
    snakeRef.current.forEach((segment) => {
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    })

    // Draw food
    ctx.fillStyle = "#ef4444" // Red
    ctx.fillRect(foodRef.current.x * CELL_SIZE, foodRef.current.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)

    // Draw grid (optional)
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }
  }, [])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gamePaused || gameOver) return

    const gameLoop = setInterval(() => {
      // Update direction
      directionRef.current = nextDirectionRef.current

      // Get current head position
      const head = { ...snakeRef.current[0] }

      // Calculate new head position
      const newHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      }

      // Check for collisions with walls
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true)
        if (score > highScore) {
          setHighScore(score)
        }
        clearInterval(gameLoop)
        return
      }

      // Check for collisions with self
      if (snakeRef.current.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true)
        if (score > highScore) {
          setHighScore(score)
        }
        clearInterval(gameLoop)
        return
      }

      // Check if snake eats food
      const ateFood = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y

      // Create new snake array
      const newSnake = [newHead, ...snakeRef.current]

      // Remove tail if no food was eaten
      if (!ateFood) {
        newSnake.pop()
      } else {
        // Generate new food and increase score
        generateFood()
        setScore((prev) => prev + 10)

        // Increase speed slightly
        speedRef.current = Math.max(50, speedRef.current - 1)
      }

      // Update snake
      snakeRef.current = newSnake

      // Draw game
      drawGame()
    }, speedRef.current)

    return () => clearInterval(gameLoop)
  }, [gameStarted, gamePaused, gameOver, score, highScore, generateFood, drawGame])

  // Initial setup
  useEffect(() => {
    resetGame()
    drawGame()

    // Set up keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          changeDirection(DIRECTIONS.UP)
          break
        case "ArrowDown":
          changeDirection(DIRECTIONS.DOWN)
          break
        case "ArrowLeft":
          changeDirection(DIRECTIONS.LEFT)
          break
        case "ArrowRight":
          changeDirection(DIRECTIONS.RIGHT)
          break
        case " ":
          if (!gameStarted) {
            startGame()
          } else {
            togglePause()
          }
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [resetGame, drawGame, changeDirection, gameStarted, startGame, togglePause])

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-2">
        <div>
          Score: <span className="font-bold">{score}</span>
        </div>
        <div>
          High Score: <span className="font-bold">{highScore}</span>
        </div>
      </div>

      <div className="relative border rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="bg-background"
        />

        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Button onClick={startGame}>
              <Play className="h-4 w-4 mr-2" />
              Start Game
            </Button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
            <h3 className="text-xl font-bold mb-2">Game Over!</h3>
            <p className="mb-4">Your score: {score}</p>
            <Button onClick={startGame}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Play Again
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 w-[150px]">
        <div className="col-start-2">
          <Button variant="outline" size="icon" onClick={() => changeDirection(DIRECTIONS.UP)}>
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="icon" onClick={() => changeDirection(DIRECTIONS.LEFT)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={gameStarted ? togglePause : startGame}>
          {gamePaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={() => changeDirection(DIRECTIONS.RIGHT)}>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <div className="col-start-2">
          <Button variant="outline" size="icon" onClick={() => changeDirection(DIRECTIONS.DOWN)}>
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
