const mongoose = require("mongoose");

const Address = mongoose.model(
  "address",
   new mongoose.Schema({
    street1: String,
    street2: String,
    city: String,
    state: String,
    country: String,
    zip_code: String,
    longitude: Number,
    latitude: Number,
    createdAt: Date,
    updatedAt: Date
  })
);

module.exports = Address;
