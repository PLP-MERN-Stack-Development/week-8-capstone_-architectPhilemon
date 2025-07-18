"use client"

import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TicketDetails {
  eventName: string
  name: string
  email: string
  ticketsCount: number
  ticketId: string
  totalPrice: number
}

interface TicketDisplayProps {
  ticketDetails: TicketDetails
}

export function TicketDisplay({ ticketDetails }: TicketDisplayProps) {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <CardTitle className="mt-4 text-2xl">Registration Confirmed!</CardTitle>
        <CardDescription>Your registration for {ticketDetails.eventName} is complete.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <p className="font-medium">Event:</p>
          <p className="text-right">{ticketDetails.eventName}</p>

          <p className="font-medium">Name:</p>
          <p className="text-right">{ticketDetails.name}</p>

          <p className="font-medium">Email:</p>
          <p className="text-right">{ticketDetails.email}</p>

          <p className="font-medium">Tickets:</p>
          <p className="text-right">{ticketDetails.ticketsCount}</p>

          <p className="font-medium">Total Price:</p>
          <p className="text-right">${ticketDetails.totalPrice.toFixed(2)}</p>

          <p className="font-medium">Ticket ID:</p>
          <p className="text-right font-mono text-sm">{ticketDetails.ticketId}</p>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          A confirmation email with your ticket details has been sent to {ticketDetails.email}.
        </p>
      </CardContent>
    </Card>
  )
}
