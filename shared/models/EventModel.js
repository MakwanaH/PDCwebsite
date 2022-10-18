const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  start: String,
  end: String,
  currency: String,
  online_event: Boolean,
  description: String,
  ticketInfo: Object,
  lang: {type: String, required: true}
})

const Event = mongoose.model("events", eventSchema);

module.exports = Event;