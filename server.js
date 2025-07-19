require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")
const { Resend } = require("resend")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const Event = require("./models/Event")
const Registration = require("./models/Registration")
const User = require("./models/User")

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI
const RESEND_API_KEY = process.env.RESEND_API_KEY
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"

const resend = new Resend(RESEND_API_KEY)

const corsOptions = {
  origin: ["http://localhost:3000", " https://week-8-capstone-architectphilemon-1-td6k.onrender.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}
app.use(cors(corsOptions))

app.use(express.json())

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token == null) return res.status(401).json({ message: "Authentication token required" })

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err.message)
      return res.status(403).json({ message: "Invalid or expired token" })
    }
    req.user = user // The user object from the JWT payload (includes role)
    next()
  })
}

// Middleware to check for superAdmin role
function authorizeSuperAdmin(req, res, next) {
  if (!req.user || req.user.role !== "superAdmin") {
    return res.status(403).json({ message: "Forbidden: Only super administrators can perform this action." })
  }
  next()
}

// --- API Routes ---

// Admin Registration Endpoint (SECURED: Only allows first admin registration, sets as superAdmin)
app.post("/api/auth/register-admin", async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" })
  }

  try {
    const userCount = await User.countDocuments()
    if (userCount > 0) {
      return res.status(403).json({ message: "Admin registration is closed. An admin user already exists." })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" })
    }

    // The very first user registered becomes the superAdmin
    const newUser = new User({ username, password, role: "superAdmin" })
    await newUser.save()

    res.status(201).json({ message: "Super Admin user registered successfully" })
  } catch (err) {
    console.error("Error during admin registration:", err)
    res.status(500).json({ message: "Failed to register admin user" })
  }
})

// User Login Endpoint
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Include the user's role in the JWT payload
    const accessToken = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    })
    res.json({ accessToken })
  } catch (err) {
    console.error("Error during login:", err)
    res.status(500).json({ message: "Server error during login" })
  }
})

// Get all events (publicly accessible)
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (err) {
    console.error("Error fetching events:", err)
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new event (PROTECTED - requires any admin role)
app.post("/api/events", authenticateToken, async (req, res) => {
  // Optional: Add a check here if req.user.role is 'admin' or 'superAdmin'
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "superAdmin")) {
    return res.status(403).json({ message: "Forbidden: Only administrators can create events." })
  }

  const { name, date, time, location, imageUrl, description, price } = req.body

  if (!name || !date || !time || !location || price === undefined) {
    return res.status(400).json({ message: "Missing required event fields: name, date, time, location, price" })
  }

  try {
    const newEvent = new Event({
      name,
      date,
      time,
      location,
      imageUrl,
      description,
      price,
    })

    await newEvent.save()
    res.status(201).json(newEvent)
  } catch (err) {
    console.error("Error creating event:", err)
    res.status(500).json({ message: "Failed to create event, please try again later." })
  }
})

// Admin: Create a new user (PROTECTED - only by superAdmin)
app.post("/api/admin/users", authenticateToken, authorizeSuperAdmin, async (req, res) => {
  const { username, password } = req.body
  const role = "admin" // New users created here will be regular 'admin'

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" })
  }

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" })
    }

    const newUser = new User({ username, password, role }) // Password will be hashed by pre-save hook
    await newUser.save()

    // Return a simplified user object without the hashed password
    res
      .status(201)
      .json({ id: newUser._id, username: newUser.username, role: newUser.role, message: "User created successfully" })
  } catch (err) {
    console.error("Error creating new user by admin:", err)
    res.status(500).json({ message: "Failed to create user" })
  }
})

// Register for an event (publicly accessible)
app.post("/api/register", async (req, res) => {
  const { eventId, name, email, ticketsCount, totalPrice } = req.body

  if (!eventId || !name || !email || !ticketsCount || totalPrice === undefined) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  try {
    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    const ticketId = `TICKET-${uuidv4().substring(0, 8).toUpperCase()}`

    const newRegistration = new Registration({
      eventId,
      name,
      email,
      ticketsCount,
      ticketId,
      totalPrice,
    })

    await newRegistration.save()

    if (RESEND_API_KEY) {
      try {
        const { data, error } = await resend.emails.send({
          from: "Event System <onboarding@resend.dev>",
          to: [email],
          subject: `Confirmation: Your Ticket for ${event.name}`,
          html: `
            <p>Hello <strong>${name}</strong>,</p>
            <p>Thank you for registering for <strong>${event.name}</strong>!</p>
            <p>Here are your ticket details:</p>
            <ul>
              <li><strong>Event:</strong> ${event.name}</li>
              <li><strong>Date:</strong> ${event.date}</li>
              <li><strong>Time:</strong> ${event.time}</li>
              <li><strong>Location:</strong> ${event.location}</li>
              <li><strong>Tickets:</strong> ${ticketsCount}</li>
              <li><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</li>
              <li><strong>Ticket ID:</strong> ${ticketId}</li>
            </ul>
            <p>We look forward to seeing you there!</p>
            <p>Best regards,<br/>The Event Management Team</p>
          `,
        })

        if (error) {
          console.error("Error sending email:", error)
        } else {
          console.log("Email sent successfully:", data)
        }
      } catch (emailError) {
        console.error("Caught exception while sending email:", emailError)
      }
    } else {
      console.warn("RESEND_API_KEY not set. Email confirmation skipped.")
    }

    res.status(201).json({
      success: true,
      ticketDetails: {
        eventName: event.name,
        name,
        email,
        ticketsCount,
        ticketId,
        totalPrice,
      },
    })
  } catch (err) {
    console.error("Error during registration:", err)
    res.status(500).json({ message: "Registration failed, please try again later." })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
