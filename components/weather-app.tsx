"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Cloud, CloudRain, Sun, Loader2, Search, Wind, Droplets, Thermometer } from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
}

const mockWeatherData: Record<string, WeatherData> = {
  "new york": {
    location: "New York, US",
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    icon: "cloud",
  },
  london: {
    location: "London, UK",
    temperature: 62,
    condition: "Rainy",
    humidity: 80,
    windSpeed: 12,
    icon: "cloud-rain",
  },
  tokyo: {
    location: "Tokyo, Japan",
    temperature: 78,
    condition: "Sunny",
    humidity: 50,
    windSpeed: 5,
    icon: "sun",
  },
  paris: {
    location: "Paris, France",
    temperature: 68,
    condition: "Cloudy",
    humidity: 70,
    windSpeed: 7,
    icon: "cloud",
  },
  sydney: {
    location: "Sydney, Australia",
    temperature: 82,
    condition: "Sunny",
    humidity: 45,
    windSpeed: 10,
    icon: "sun",
  },
}

export default function WeatherApp() {
  const [city, setCity] = useState("new york")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchWeather = () => {
    setLoading(true)
    setError("")

    // Simulate API call with timeout
    setTimeout(() => {
      const normalizedCity = city.toLowerCase()
      if (mockWeatherData[normalizedCity]) {
        setWeather(mockWeatherData[normalizedCity])
        setError("")
      } else {
        setWeather(null)
        setError("City not found. Try New York, London, Tokyo, Paris, or Sydney.")
      }
      setLoading(false)
    }, 800)
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case "cloud":
        return <Cloud className="h-16 w-16 text-blue-400" />
      case "cloud-rain":
        return <CloudRain className="h-16 w-16 text-blue-600" />
      case "sun":
        return <Sun className="h-16 w-16 text-yellow-400" />
      default:
        return <Cloud className="h-16 w-16 text-blue-400" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <Button onClick={fetchWeather} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {weather && !loading && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              {getWeatherIcon(weather.icon)}
              <h2 className="text-3xl font-bold mt-4">{weather.temperature}°F</h2>
              <p className="text-muted-foreground">{weather.condition}</p>
              <p className="font-medium mt-2">{weather.location}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <Thermometer className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="font-medium">{weather.temperature}°F</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <Droplets className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-medium">{weather.humidity}%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardContent className="p-4 flex items-center gap-4">
                <Wind className="h-8 w-8 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Wind Speed</p>
                  <p className="font-medium">{weather.windSpeed} mph</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  )
}
