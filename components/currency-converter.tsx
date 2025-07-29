"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock exchange rates (relative to USD)
const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 150.25,
  CAD: 1.35,
  AUD: 1.52,
  CNY: 7.23,
  INR: 83.45,
  BRL: 5.18,
  ZAR: 18.65,
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1)
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [convertedAmount, setConvertedAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const currencies = Object.keys(exchangeRates)

  useEffect(() => {
    convertCurrency()
  }, [amount, fromCurrency, toCurrency])

  const convertCurrency = () => {
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const fromRate = exchangeRates[fromCurrency as keyof typeof exchangeRates]
      const toRate = exchangeRates[toCurrency as keyof typeof exchangeRates]

      // Convert to USD first, then to target currency
      const result = (amount / fromRate) * toRate
      setConvertedAmount(Number.parseFloat(result.toFixed(2)))
      setIsLoading(false)
    }, 300)
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
        <div className="space-y-2">
          <Label htmlFor="from-currency">From</Label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger id="from-currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="ghost" size="icon" onClick={swapCurrencies} className="mb-0.5">
          <ArrowRightLeft className="h-4 w-4" />
          <span className="sr-only">Swap currencies</span>
        </Button>

        <div className="space-y-2">
          <Label htmlFor="to-currency">To</Label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger id="to-currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg text-center">
        {isLoading ? (
          <div className="flex justify-center items-center py-2">
            <RefreshCw className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-1">
              {amount} {fromCurrency} =
            </p>
            <p className="text-3xl font-bold">
              {convertedAmount} {toCurrency}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              1 {fromCurrency} ={" "}
              {(
                exchangeRates[toCurrency as keyof typeof exchangeRates] /
                exchangeRates[fromCurrency as keyof typeof exchangeRates]
              ).toFixed(4)}{" "}
              {toCurrency}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
