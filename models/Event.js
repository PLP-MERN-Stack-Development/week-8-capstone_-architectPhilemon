const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
})

module.exports = mongoose.model("Event", eventSchema)
