import { createServerComponentClient } from "@/lib/supabase"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) {
  const { eventId, eventName, name, email, ticketsCount, totalPrice } = await req.json()

  if (!eventId || !eventName || !name || !email || !ticketsCount || totalPrice === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const ticketId = `TICKET-${uuidv4().substring(0, 8).toUpperCase()}`

  // If Supabase isn’t configured, fall back to a local response.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn("Supabase env vars not set – performing offline registration and returning mock ticketDetails.")

    return NextResponse.json({
      success: true,
      ticketDetails: {
        eventName,
        name,
        email,
        ticketsCount,
        ticketId,
        totalPrice,
      },
    })
  }

  // Supabase is available – write to DB.
  const supabase = createServerComponentClient()
  const { error } = await supabase.from("registrations").insert({
    event_id: eventId,
    name,
    email,
    tickets_count: ticketsCount,
    ticket_id: ticketId,
    total_price: totalPrice,
  })

  if (error) {
    console.error("Supabase insert error:", error.message)
    return NextResponse.json({ error: "Registration failed, please try again later." }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    ticketDetails: {
      eventName,
      name,
      email,
      ticketsCount,
      ticketId,
      totalPrice,
    },
  })
}
