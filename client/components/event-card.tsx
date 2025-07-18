import Image from "next/image"
import { CalendarDays, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EventRegistrationForm } from "./event-registration-form"

interface Event {
  _id: string // MongoDB uses _id
  name: string
  date: string
  time: string
  location: string
  imageUrl: string // Changed from image_url to imageUrl to match Mongoose schema
  description: string
  price: number
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={event.imageUrl || "/placeholder.svg"}
          alt={event.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-semibold">{event.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-4 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>
            {event.date} &bull; {event.time}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <div className="text-lg font-bold text-primary">${event.price.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Register Now</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Register for {event.name}</DialogTitle>
              <DialogDescription>Fill out the form below to secure your spot.</DialogDescription>
            </DialogHeader>
            <EventRegistrationForm eventId={event._id} eventName={event.name} eventPrice={event.price} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
