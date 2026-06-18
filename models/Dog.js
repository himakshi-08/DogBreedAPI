const mongoose = require("mongoose");
const dogSchema = new mongoose.Schema(
  {
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Dog", dogSchema);