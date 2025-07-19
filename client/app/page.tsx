import { EventCard } from "@/components/event-card"

// Define the base URL for your backend API
const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL ?? "https://week-8-capstone-architectphilemon.onrender.com"

interface Event {
  _id: string // MongoDB uses _id
  name: string
  date: string
  time: string
  location: string
  imageUrl: string
  description: string
  price: number
}

export default async function HomePage() {
  let events: Event[] = []
  let error: string | null = null

  try {
    const res = await fetch(`https://week-8-capstone-architectphilemon.onrender.com/api/events`)
    if (!res.ok) {
      // Attempt to parse error message from response body if available
      const errorData = await res.json().catch(() => ({ message: res.statusText }))
      throw new Error(`Failed to fetch events: ${res.status} - ${errorData.message || "Unknown error"}`)
    }

    events = await res.json()
  } catch (err: any) {
    console.error("Failed to fetch events:", err)
    error = err.message || "Could not load events. Please ensure the backend server is running and accessible."
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-red-500">{error}</p>
        <p className="text-muted-foreground mt-2">Check your backend server and network connection.</p>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-muted-foreground">No events found.</p>
        <p className="text-muted-foreground mt-2">
          If this is unexpected, ensure your MongoDB is seeded and backend is running.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="text-4xl text-color bg-green-600 text-center mb-10">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  )
}
