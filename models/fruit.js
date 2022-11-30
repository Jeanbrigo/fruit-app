////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const mongoose = require('./connection') // we imported mongoose here

const { Schema, model } = mongoose // destructuring, grabbing model and schema off mongoose variable

// make fruits schema
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
  username: String
})

// make fruit model
const Fruit = model("Fruit", fruitsSchema)

module.exports = Fruit