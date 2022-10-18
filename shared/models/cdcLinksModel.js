const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cdcLinksSchema = new Schema({
  name: String,
  link: String,
  active: Boolean,
  lang: {type: String, required: true}
})

const Link = mongoose.model("cdc-links", cdcLinksSchema);

module.exports = Link;