"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const clearDisplay = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const toggleSign = () => {
    setDisplay(String(-Number.parseFloat(display)))
  }

  const inputPercent = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value / 100))
  }

  const handleOperator = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = performCalculation()
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const performCalculation = () => {
    if (firstOperand === null || operator === null) {
      return Number.parseFloat(display)
    }

    const secondOperand = Number.parseFloat(display)
    let result = 0

    switch (operator) {
      case "+":
        result = firstOperand + secondOperand
        break
      case "-":
        result = firstOperand - secondOperand
        break
      case "*":
        result = firstOperand * secondOperand
        break
      case "/":
        result = firstOperand / secondOperand
        break
      default:
        return secondOperand
    }

    return result
  }

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return
    }

    const result = performCalculation()
    setDisplay(String(result))
    setFirstOperand(result)
    setOperator(null)
    setWaitingForSecondOperand(true)
  }

  return (
    <div className="max-w-xs mx-auto">
      <div className="bg-muted p-4 rounded-lg mb-4 text-right">
        <div className="text-2xl font-bold tracking-wider overflow-x-auto whitespace-nowrap">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button variant="outline" onClick={clearDisplay}>
          C
        </Button>
        <Button variant="outline" onClick={toggleSign}>
          +/-
        </Button>
        <Button variant="outline" onClick={inputPercent}>
          %
        </Button>
        <Button variant="secondary" onClick={() => handleOperator("/")}>
          /
        </Button>

        <Button onClick={() => inputDigit("7")}>7</Button>
        <Button onClick={() => inputDigit("8")}>8</Button>
        <Button onClick={() => inputDigit("9")}>9</Button>
        <Button variant="secondary" onClick={() => handleOperator("*")}>
          ×
        </Button>

        <Button onClick={() => inputDigit("4")}>4</Button>
        <Button onClick={() => inputDigit("5")}>5</Button>
        <Button onClick={() => inputDigit("6")}>6</Button>
        <Button variant="secondary" onClick={() => handleOperator("-")}>
          -
        </Button>

        <Button onClick={() => inputDigit("1")}>1</Button>
        <Button onClick={() => inputDigit("2")}>2</Button>
        <Button onClick={() => inputDigit("3")}>3</Button>
        <Button variant="secondary" onClick={() => handleOperator("+")}>
          +
        </Button>

        <Button className="col-span-2" onClick={() => inputDigit("0")}>
          0
        </Button>
        <Button onClick={inputDecimal}>.</Button>
        <Button variant="primary" onClick={handleEquals}>
          =
        </Button>
      </div>
    </div>
  )
}
