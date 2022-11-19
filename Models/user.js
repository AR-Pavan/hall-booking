const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
      min: 3,
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      requried: true
    },
    contactNo: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hasBookedRoom: {
      type: Boolean,
      default: false,
    },
    bookedRoom: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
