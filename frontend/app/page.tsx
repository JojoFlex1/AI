"use client"

import React, { useState, useRef, useEffect } from "react"
import { Mic, MicOff, Send, Sparkles, BookOpen, MessageCircle, GraduationCap, Languages, Wifi, WifiOff, RefreshCw, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "assistant"
  text: string
  timestamp: Date
}

export default function MwalimuAI() {
  const [isListening, setIsListening] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: "assistant",
      text: "Habari! Mimi ni Mwalimu AI. Niko hapa kukusaidia na English. Uliza chochote! 🎓",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineHelp, setShowOfflineHelp] = useState(false)
  const conversationEndRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation])

  // Check backend connection on mount
  useEffect(() => {
    checkConnection()
  }, [])

  // Recording timer
  useEffect(() => {
    if (isListening) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setRecordingTime(0)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isListening])

  // Check backend connection
  const checkConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000/health', {
        method: 'GET',
      })
      if (response.ok) {
        setIsOnline(true)
        setShowOfflineHelp(false)
      } else {
        setIsOnline(false)
      }
    } catch (error) {
      setIsOnline(false)
    }
  }

  // Handle voice recording with Web Speech API
  const handleVoicePress = () => {
    if (!isListening) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (!SpeechRecognition) {
        alert("Samahani, browser yako haikai speech recognition. Tumia Chrome ama Edge!")
        return
      }
      
      const recognition = new SpeechRecognition()
      recognition.lang = 'sw-KE' // Swahili (Kenya)
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      
      setIsListening(true)
      setRecordingTime(0)
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        console.log('🎤 Heard:', transcript)
        setInputText(transcript)
        setIsListening(false)
      }
      
      recognition.onerror = (event: any) => {
        console.error('❌ Speech error:', event.error)
        setIsListening(false)
        if (event.error === 'no-speech') {
          alert('Sikuona sauti. Jaribu tena!')
        }
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      recognition.start()
      console.log('🎤 Listening...')
    }
  }

  // Handle text input
  const handleTextSubmit = (e: any) => {
    e.preventDefault?.()
    if (inputText.trim() && !isProcessing) {
      handleSendMessage(inputText)
      setInputText("")
    }
  }

  // Send message and get response
  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      role: "user",
      text: message,
      timestamp: new Date(),
    }
    setConversation((prev) => [...prev, userMessage])
    setIsProcessing(true)

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      })
      
      if (!response.ok) {
        setIsOnline(false)
        setShowOfflineHelp(true)
        throw new Error('Backend error')
      }
      
      setIsOnline(true)
      setShowOfflineHelp(false)
      const data = await response.json()

      const aiMessage: Message = {
        role: "assistant",
        text: data.response,
        timestamp: new Date()
      }

      setConversation(prev => [...prev, aiMessage])

    } catch (error) {
      console.error('❌ Error connecting to backend:', error)
      setIsOnline(false)
      setShowOfflineHelp(true)
      
      // Show offline tip instead of generic error
      const offlineTip = getRandomOfflineTip()
      const tipMessage: Message = {
        role: "assistant",
        text: offlineTip,
        timestamp: new Date()
      }
      setConversation(prev => [...prev, tipMessage])
    }

    setIsProcessing(false)
  }

  // Get random offline tip
  const getRandomOfflineTip = () => {
    const tips = [
      "💡 OFFLINE TIP: Past tense ni wakati uliopita. Tunabadilisha verbs:\n- go → went\n- eat → ate\n- see → saw\n\nJaribu kuandika sentensi 3 kwa past tense!",
      
      "💡 OFFLINE TIP: Present Continuous tunatumia '-ing':\n- I am reading (ninasoma sasa)\n- She is cooking (anapika sasa)\n- They are playing (wanacheza sasa)\n\nTumia 'am/is/are' + verb-ing!",
      
      "💡 OFFLINE TIP: Prepositions (at, in, on):\n- at = mahali (at school, at home)\n- in = ndani (in Nairobi, in 2025)\n- on = juu (on Monday, on the table)\n\nKumbuka hizi!",
      
      "💡 OFFLINE TIP: Question words:\n- What = Nini\n- Where = Wapi\n- When = Lini\n- Why = Kwa nini\n- How = Vipi\n\nMfano: Where is the duka? (Duka iko wapi?)",
      
      "💡 OFFLINE TIP: Plural forms:\n- book → books\n- child → children\n- person → people\n- matatu → matatus 😊\n\nZingatia irregular plurals!"
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  // Sample conversations for offline browsing
  const sampleConversations = [
    {
      question: "Nisaidie na past tense",
      answer: "Sawa! Past tense ni wakati uliopita. Tunatumia kuonyesha kitu kilichofanyika zamani.\n\nMfano:\n- Today I go to shule → Yesterday I went to shule\n- I eat ugali → I ate ugali JANA\n\nJaribu hii: She ___ to Mombasa last week (go in past tense)."
    },
    {
      question: "What is present continuous?",
      answer: "Poa! Present continuous ni actions zinazofanyika SASA hivi.\n\nFormula: am/is/are + verb-ing\n\nMfano:\n- I am eating chapati (ninakula sasa)\n- She is going to duka (anaenda sasa)\n- They are playing football (wanacheza sasa)\n\nKumbuka: Lazima utumie 'am/is/are' + -ing!"
    },
    {
      question: "Help with prepositions",
      answer: "Vizuri! Prepositions ni maneno ya mahali na wakati:\n\n🏫 AT = mahali/wakati specific\n- at school, at 3pm, at home\n\n📍 IN = ndani/mji/mwaka\n- in Nairobi, in Kenya, in 2025\n\n📅 ON = juu/siku\n- on Monday, on the table, on the bus\n\nJaribu: I live ___ Nairobi (in/on/at?)"
    }
  ]

  // Quick help buttons
  const quickTopics = [
    { icon: GraduationCap, label: "Grammar", query: "Nisaidie na grammar" },
    { icon: BookOpen, label: "Vocabulary", query: "Teach me new words" },
    { icon: Languages, label: "Pronunciation", query: "Nisaidie na pronunciation" },
    { icon: MessageCircle, label: "Writing", query: "Help with essay writing" },
  ]

  // Format recording time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl flex flex-col gap-6 my-8">
        {/* Header */}
        <header className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-6 shadow-lg border-b border-primary/20 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Mwalimu AI</h1>
            </div>
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-green-300" />
                  <span className="text-xs text-green-200">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-300" />
                  <span className="text-xs text-red-200">Offline</span>
                  <Button
                    onClick={checkConnection}
                    size="sm"
                    variant="ghost"
                    className="ml-2 h-7 px-2 text-xs text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Retry
                  </Button>
                </>
              )}
            </div>
          </div>
          <p className="text-primary-foreground/80 text-sm">Your Personal Swahili-Speaking English Tutor</p>
        </header>

        {/* Offline Help Banner */}
        {showOfflineHelp && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg shadow">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-amber-900 mb-1">Offline Mode Active</h3>
                <p className="text-xs text-amber-800 mb-2">
                  Backend haiko connected. Lakini unaweza bado kujifunza! Angalia tips hapa chini au jaribu kuconnect tena.
                </p>
                <Button
                  onClick={checkConnection}
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Try Reconnecting
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex flex-col gap-4">
          {/* Conversation Area */}
          <div className="bg-card rounded-2xl shadow-lg p-6 overflow-y-auto h-[550px] border border-border">
            <div className="space-y-4">
              {conversation.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[75%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-accent-foreground" />
                        <span className="text-xs font-semibold text-accent-foreground">Mwalimu</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap leading-6">{msg.text}</p>
                    <span className="text-xs opacity-60 mt-2 block">
                      {msg.timestamp.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex justify-start pr-16">
                  <div className="inline-block bg-muted rounded-2xl rounded-bl-none p-4" style={{ maxWidth: 'fit-content' }}>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-accent-foreground" />
                      <span className="text-xs font-semibold text-accent-foreground">Mwalimu</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={conversationEndRef} />
            </div>
          </div>

          {/* Offline Sample Conversations */}
          {!isOnline && (
            <div className="bg-card rounded-xl shadow border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <p className="text-sm font-semibold text-foreground">Sample Conversations (Offline Mode)</p>
              </div>
              <div className="space-y-3">
                {sampleConversations.map((conv, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const userMsg: Message = {
                        role: "user",
                        text: conv.question,
                        timestamp: new Date()
                      }
                      const aiMsg: Message = {
                        role: "assistant",
                        text: conv.answer,
                        timestamp: new Date()
                      }
                      setConversation(prev => [...prev, userMsg, aiMsg])
                    }}
                    className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <p className="text-xs font-medium text-primary">{conv.question}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{conv.answer}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Topics */}
          {isOnline && (
            <div className="bg-card rounded-xl shadow border border-border p-5">
              <p className="text-xs text-muted-foreground mb-4 font-medium">Quick Topics:</p>
              <div className="grid grid-cols-2 gap-3">
                {quickTopics.map((topic, idx) => {
                  const Icon = topic.icon
                  return (
                    <Button
                      key={idx}
                      onClick={() => handleSendMessage(topic.query)}
                      disabled={isProcessing}
                      variant="outline"
                      className="flex items-center gap-3 h-auto py-4 px-4 justify-start hover:bg-accent/50 transition-colors"
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{topic.label}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
            {/* Voice Button with Enhanced Animation */}
            <div className="flex justify-center mb-6 relative">
              <div className="relative">
                {/* Animated rings when listening */}
                {isListening && (
                  <>
                    <div className="absolute inset-0 rounded-full border-4 border-destructive animate-ping opacity-75"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-destructive animate-pulse"></div>
                  </>
                )}
                
                <button
                  onClick={handleVoicePress}
                  disabled={isProcessing}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 z-10 ${
                    isListening
                      ? "bg-destructive shadow-xl shadow-destructive/30"
                      : "bg-gradient-to-br from-primary to-primary/80 shadow-lg hover:shadow-xl hover:scale-105"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isListening ? (
                    <MicOff className="w-10 h-10 text-destructive-foreground" />
                  ) : (
                    <Mic className="w-10 h-10 text-primary-foreground" />
                  )}
                </button>
              </div>
              
              {/* Recording status */}
              {isListening && (
                <div className="absolute mt-24 text-center">
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-destructive">Recording</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{formatTime(recordingTime)}</span>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-muted-foreground mb-5">
              {isListening ? "Sema swali lako..." : "Press to speak, or type below"}
            </p>

            {/* Text Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleTextSubmit(e as any)
                  }
                }}
                placeholder="Andika swali lako hapa..."
                disabled={isProcessing}
                className="flex-1 px-5 py-4 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
              <Button
                onClick={(e) => handleTextSubmit(e as any)}
                disabled={!inputText.trim() || isProcessing}
                className="px-8 py-4 flex items-center gap-2 text-base hover:scale-105 transition-transform"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border rounded-2xl py-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Mwalimu AI</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2025 Mwalimu AI 🇰🇪
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}