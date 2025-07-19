const mongoose = require("mongoose")

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  ticketsCount: { type: Number, required: true },
  ticketId: { type: String, unique: true, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Registration", registrationSchema)
