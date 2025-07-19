import { createServerComponentClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

const fallbackEvents = [
  {
    id: "1",
    name: "Annual Tech Conference 2025",
    date: "October 26, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Grand Convention Center, Hall A",
    image_url: "/placeholder.svg?height=400&width=600",
    description: "Join us for the biggest tech conference of the year, featuring leading experts and innovators.",
    price: 199.99,
  },
  {
    id: "2",
    name: "Future of AI Summit",
    date: "November 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Innovation Hub Auditorium",
    image_url: "/placeholder.svg?height=400&width=600",
    description: "Explore the latest advancements and ethical considerations in Artificial Intelligence.",
    price: 249.99,
  },
  {
    id: "3",
    name: "Web Development Workshop",
    date: "December 5, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Community Learning Center, Room 101",
    image_url: "/placeholder.svg?height=400&width=600",
    description: "A hands-on workshop covering modern web development frameworks and best practices.",
    price: 99.99,
  },
  {
    id: "4",
    name: "Digital Marketing Masterclass",
    date: "January 20, 2026",
    time: "9:30 AM - 1:30 PM",
    location: "Business Incubation Center",
    image_url: "/placeholder.svg?height=400&width=600",
    description: "Learn strategies to boost your online presence and drive engagement.",
    price: 149.99,
  },
]

export async function GET() {
  // If Supabase env vars are missing, immediately return static data.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.warn(
      "Supabase env vars not found – serving fallback events. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to use live data.",
    )
    return NextResponse.json(fallbackEvents)
  }

  try {
    const supabase = createServerComponentClient()
    const { data: events, error } = await supabase.from("events").select("*")

    if (error) {
      console.error("Supabase error:", error.message)
      // Serve fallback data instead of 500 so the UI still works.
      return NextResponse.json(fallbackEvents)
    }

    return NextResponse.json(events ?? fallbackEvents)
  } catch (err) {
    console.error("Unexpected failure fetching events:", err)
    // Last-ditch fallback.
    return NextResponse.json(fallbackEvents)
  }
}
