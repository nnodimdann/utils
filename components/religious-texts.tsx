"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, BookOpen, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for Quran
const quranChapters = [
  { id: 1, name: "Al-Fatihah", verses: 7 },
  { id: 2, name: "Al-Baqarah", verses: 286 },
  { id: 3, name: "Ali 'Imran", verses: 200 },
  { id: 4, name: "An-Nisa", verses: 176 },
  { id: 5, name: "Al-Ma'idah", verses: 120 },
  // More chapters would be added in a real app
]

// Mock data for Bible
const bibleBooks = [
  { id: 1, name: "Genesis", chapters: 50 },
  { id: 2, name: "Exodus", chapters: 40 },
  { id: 3, name: "Leviticus", chapters: 27 },
  { id: 4, name: "Numbers", chapters: 36 },
  { id: 5, name: "Deuteronomy", chapters: 34 },
  // More books would be added in a real app
]

// Mock content generator
const generateMockContent = (text: string, length: number) => {
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

  return Array.from({ length }, (_, i) => `${i + 1}. ${loremIpsum.substring(0, 50 + Math.random() * 100)}`).join("\n\n")
}

export default function ReligiousTexts() {
  const [activeTab, setActiveTab] = useState("quran")
  const [quranChapter, setQuranChapter] = useState("1")
  const [bibleBook, setBibleBook] = useState("1")
  const [bibleChapter, setBibleChapter] = useState("1")
  const [searchQuery, setSearchQuery] = useState("")

  // Generate mock content based on selection
  const quranContent = generateMockContent(
    `Quran Chapter ${quranChapter}`,
    quranChapters.find((c) => c.id === Number.parseInt(quranChapter))?.verses || 7,
  )

  const bibleContent = generateMockContent(
    `Bible ${bibleBook} Chapter ${bibleChapter}`,
    30 + Math.floor(Math.random() * 20),
  )

  const handlePrevious = () => {
    if (activeTab === "quran") {
      const currentIndex = Number.parseInt(quranChapter)
      if (currentIndex > 1) {
        setQuranChapter((currentIndex - 1).toString())
      }
    } else {
      const currentBook = Number.parseInt(bibleBook)
      const currentChapter = Number.parseInt(bibleChapter)

      if (currentChapter > 1) {
        setBibleChapter((currentChapter - 1).toString())
      } else if (currentBook > 1) {
        setBibleBook((currentBook - 1).toString())
        setBibleChapter(bibleBooks.find((b) => b.id === currentBook - 1)?.chapters.toString() || "1")
      }
    }
  }

  const handleNext = () => {
    if (activeTab === "quran") {
      const currentIndex = Number.parseInt(quranChapter)
      if (currentIndex < quranChapters.length) {
        setQuranChapter((currentIndex + 1).toString())
      }
    } else {
      const currentBook = Number.parseInt(bibleBook)
      const currentChapter = Number.parseInt(bibleChapter)
      const maxChapters = bibleBooks.find((b) => b.id === currentBook)?.chapters || 1

      if (currentChapter < maxChapters) {
        setBibleChapter((currentChapter + 1).toString())
      } else if (currentBook < bibleBooks.length) {
        setBibleBook((currentBook + 1).toString())
        setBibleChapter("1")
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search religious texts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quran">Quran</TabsTrigger>
          <TabsTrigger value="bible">Bible</TabsTrigger>
        </TabsList>

        <TabsContent value="quran" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quran</CardTitle>
                  <CardDescription>Select a chapter (Surah)</CardDescription>
                </div>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <Select value={quranChapter} onValueChange={setQuranChapter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent>
                  {quranChapters.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id.toString()}>
                      {chapter.id}. {chapter.name} ({chapter.verses} verses)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <ScrollArea className="h-[300px] mt-4 border rounded-md p-4">
                <div className="whitespace-pre-line">{quranContent}</div>
              </ScrollArea>

              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={handlePrevious} disabled={Number.parseInt(quranChapter) <= 1}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={Number.parseInt(quranChapter) >= quranChapters.length}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bible" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Bible</CardTitle>
                  <CardDescription>Select a book and chapter</CardDescription>
                </div>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Select value={bibleBook} onValueChange={setBibleBook}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select book" />
                    </SelectTrigger>
                    <SelectContent>
                      {bibleBooks.map((book) => (
                        <SelectItem key={book.id} value={book.id.toString()}>
                          {book.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={bibleChapter} onValueChange={setBibleChapter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: bibleBooks.find((b) => b.id === Number.parseInt(bibleBook))?.chapters || 1 },
                        (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            Chapter {i + 1}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <ScrollArea className="h-[300px] border rounded-md p-4">
                <div className="whitespace-pre-line">{bibleContent}</div>
              </ScrollArea>

              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={Number.parseInt(bibleBook) <= 1 && Number.parseInt(bibleChapter) <= 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={
                    Number.parseInt(bibleBook) >= bibleBooks.length &&
                    Number.parseInt(bibleChapter) >=
                      (bibleBooks.find((b) => b.id === Number.parseInt(bibleBook))?.chapters || 1)
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
