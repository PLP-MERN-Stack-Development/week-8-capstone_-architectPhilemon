require("dotenv").config()
const mongoose = require("mongoose")
const Event = require("./models/Event")

const MONGODB_URI = process.env.MONGODB_URI

const eventsData = [
  {
    name: "Annual Tech Conference 2025",
    date: "October 26, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Grand Convention Center, Hall A",
    imageUrl: "/placeholder.svg?height=400&width=600",
    description: "Join us for the biggest tech conference of the year, featuring leading experts and innovators.",
    price: 199.99,
  },
  {
    name: "Future of AI Summit",
    date: "November 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Innovation Hub Auditorium",
    imageUrl: "/placeholder.svg?height=400&width=600",
    description: "Explore the latest advancements and ethical considerations in Artificial Intelligence.",
    price: 249.99,
  },
  {
    name: "Web Development Workshop",
    date: "December 5, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Community Learning Center, Room 101",
    imageUrl: "/placeholder.svg?height=400&width=600",
    description: "A hands-on workshop covering modern web development frameworks and best practices.",
    price: 99.99,
  },
  {
    name: "Digital Marketing Masterclass",
    date: "January 20, 2026",
    time: "9:30 AM - 1:30 PM",
    location: "Business Incubation Center",
    imageUrl: "/placeholder.svg?height=400&width=600",
    description: "Learn strategies to boost your online presence and drive engagement.",
    price: 149.99,
  },
]

async function seedDatabase() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in .env. Please set it.")
    process.exit(1)
  }

  try {
    await mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected for seeding")

    // Clear existing events (optional, for fresh seed)
    await Event.deleteMany({})
    console.log("Existing events cleared.")

    await Event.insertMany(eventsData)
    console.log("Events seeded successfully!")
  } catch (err) {
    console.error("Error seeding database:", err)
  } finally {
    mongoose.connection.close()
    console.log("MongoDB connection closed.")
  }
}

seedDatabase()
