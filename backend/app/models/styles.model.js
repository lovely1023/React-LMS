const mongoose = require("mongoose");

var StyleSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  count: Number,
  status: String,
  createdAt: Date,
  updatedAt: Date
})

StyleSchema.methods.toStyleJson = function () {
  return {
    id: this._id,
    name: this.name,
    description: this.description,
    count: this.count,
    createdAt: this.createdAt,
    status: this.status,
  }
}

const Style = mongoose.model(
  "styles",
  StyleSchema
);

module.exports = Style;
