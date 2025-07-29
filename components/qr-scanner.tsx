"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Link, QrCode, Scan, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function QrScanner() {
  const [activeTab, setActiveTab] = useState("scan")
  const [scanning, setScanning] = useState(false)
  const [scannedResult, setScannedResult] = useState("")
  const [generatedQR, setGeneratedQR] = useState("")
  const [qrText, setQrText] = useState("")

  const startScanning = () => {
    setScanning(true)

    // Simulate scanning process
    setTimeout(() => {
      setScanning(false)
      setScannedResult("https://example.com/product/12345")
    }, 2000)
  }

  const stopScanning = () => {
    setScanning(false)
  }

  const clearResult = () => {
    setScannedResult("")
  }

  const generateQR = () => {
    if (qrText.trim()) {
      // In a real app, we would generate a QR code
      // Here we'll just simulate it with a placeholder
      setGeneratedQR(`/placeholder.svg?height=200&width=200&query=QR%20Code%20for%20${encodeURIComponent(qrText)}`)
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="scan">
          <Scan className="h-4 w-4 mr-2" />
          Scan QR Code
        </TabsTrigger>
        <TabsTrigger value="generate">
          <QrCode className="h-4 w-4 mr-2" />
          Generate QR Code
        </TabsTrigger>
      </TabsList>

      <TabsContent value="scan" className="space-y-4">
        {!scanning && !scannedResult ? (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
            <Camera className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground mb-4">
              Position a QR code in front of your camera to scan it
            </p>
            <Button onClick={startScanning}>
              <Camera className="h-4 w-4 mr-2" />
              Start Camera
            </Button>
          </div>
        ) : scanning ? (
          <div className="relative">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-primary animate-pulse rounded-lg"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-primary/50 animate-scan rounded-lg"></div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 bg-transparent"
              onClick={stopScanning}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert>
              <Link className="h-4 w-4 mr-2" />
              <AlertDescription>
                <a href={scannedResult} target="_blank" rel="noopener noreferrer" className="font-medium underline">
                  {scannedResult}
                </a>
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button onClick={startScanning}>Scan Again</Button>
              <Button variant="outline" onClick={clearResult}>
                Clear
              </Button>
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="generate" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="qr-text">Text or URL</Label>
          <Textarea
            id="qr-text"
            placeholder="Enter text or URL to generate QR code"
            value={qrText}
            onChange={(e) => setQrText(e.target.value)}
          />
        </div>

        <Button onClick={generateQR} disabled={!qrText.trim()}>
          Generate QR Code
        </Button>

        {generatedQR && (
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <img src={generatedQR || "/placeholder.svg"} alt="Generated QR Code" className="w-48 h-48 object-contain" />
            <p className="text-sm text-muted-foreground mt-2">Scan with any QR code reader</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
