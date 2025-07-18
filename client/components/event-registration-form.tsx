"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TicketDisplay } from "./ticket-display"
import { DialogFooter } from "@/components/ui/dialog"

interface EventRegistrationFormProps {
  eventId: string // This will be MongoDB's _id
  eventName: string
  eventPrice: number
}

interface TicketDetails {
  eventName: string
  name: string
  email: string
  ticketsCount: number
  ticketId: string
  totalPrice: number
}

// Define the base URL for your backend API
const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://week-8-capstone-architectphilemon.onrender.com"

export function EventRegistrationForm({ eventId, eventName, eventPrice }: EventRegistrationFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [ticketsCount, setTicketsCount] = useState("1")
  const [submittedTicket, setSubmittedTicket] = useState<TicketDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const count = Number.parseInt(ticketsCount)
    const totalPrice = eventPrice * count

    try {
      const res = await fetch(`${BACKEND_API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          name,
          email,
          ticketsCount: count,
          totalPrice,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Registration failed.")
        return
      }

      setSubmittedTicket(data.ticketDetails)
    } catch (err) {
      console.error("Registration error:", err)
      setError("Unable to register right now. Please ensure the backend server is running.")
    } finally {
      setIsLoading(false)
    }
  }

  if (submittedTicket) {
    return <TicketDisplay ticketDetails={submittedTicket} />
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="tickets" className="text-right">
          Tickets
        </Label>
        <Select value={ticketsCount} onValueChange={setTicketsCount} required>
          <SelectTrigger id="tickets" className="col-span-3">
            <SelectValue placeholder="Select number of tickets" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registering…" : "Confirm Registration"}
        </Button>
      </DialogFooter>
    </form>
  )
}
