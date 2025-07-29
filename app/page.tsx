import type React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import WeatherApp from "@/components/weather-app"
import Calculator from "@/components/calculator"
import CurrencyConverter from "@/components/currency-converter"
import QrScanner from "@/components/qr-scanner"
import SnakeGame from "@/components/snake-game"
import NoteApp from "@/components/note-app"
import ReligiousTexts from "@/components/religious-texts"
import { CloudSun, CalculatorIcon, DollarSign, ScanLine, Gamepad2, FileText, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All-in-One Utility App</h1>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="currency">Currency</TabsTrigger>
          <TabsTrigger value="scanner">Scanner</TabsTrigger>
          <TabsTrigger value="game">Game</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="religious">Religious</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
              title="Weather"
              description="Check current weather conditions"
              icon={<CloudSun className="h-5 w-5 text-primary" />}
            />
            <DashboardCard
              title="Calculator"
              description="Perform quick calculations"
              icon={<CalculatorIcon className="h-5 w-5 text-primary" />}
            />
            <DashboardCard
              title="Currency Converter"
              description="Convert between currencies"
              icon={<DollarSign className="h-5 w-5 text-primary" />}
            />
            <DashboardCard
              title="QR Scanner"
              description="Scan QR codes and barcodes"
              icon={<ScanLine className="h-5 w-5 text-primary" />}
            />
            <DashboardCard
              title="Snake Game"
              description="Play the classic snake game"
              icon={<Gamepad2 className="h-5 w-5 text-primary" />}
            />
            <DashboardCard
              title="Notes"
              description="Take and save quick notes"
              icon={<FileText className="h-5 w-5 text-primary" />}
            />
            <DashboardCard
              title="Religious Texts"
              description="Read Quran and Bible passages"
              icon={<BookOpen className="h-5 w-5 text-primary" />}
            />
          </div>
        </TabsContent>

        <TabsContent value="weather" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Weather</CardTitle>
              <CardDescription>Check current weather conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherApp />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Calculator</CardTitle>
              <CardDescription>Perform quick calculations</CardDescription>
            </CardHeader>
            <CardContent>
              <Calculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currency" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Currency Converter</CardTitle>
              <CardDescription>Convert between currencies</CardDescription>
            </CardHeader>
            <CardContent>
              <CurrencyConverter />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scanner" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>QR Scanner</CardTitle>
              <CardDescription>Scan QR codes and barcodes</CardDescription>
            </CardHeader>
            <CardContent>
              <QrScanner />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="game" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Snake Game</CardTitle>
              <CardDescription>Play the classic snake game</CardDescription>
            </CardHeader>
            <CardContent>
              <SnakeGame />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Take and save quick notes</CardDescription>
            </CardHeader>
            <CardContent>
              <NoteApp />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="religious" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Religious Texts</CardTitle>
              <CardDescription>Read Quran and Bible passages</CardDescription>
            </CardHeader>
            <CardContent>
              <ReligiousTexts />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

interface DashboardCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

function DashboardCard({ title, description, icon }: DashboardCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
