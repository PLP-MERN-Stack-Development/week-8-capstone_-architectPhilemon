import { EventCard } from "@/components/event-card"

export default async function HomePage() {
  // Always use a relative path so it works in every runtime (preview, localhost, prod)
  let events: any[] = []

  try {
    const res = await fetch("/api/events", { cache: "no-store" })
    if (res.ok) {
      events = await res.json()
    } else {
      console.error("API responded with status", res.status)
    }
  } catch (err) {
    console.error("Failed to fetch events:", err)
  }

  if (events.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-muted-foreground">No events found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-10">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
