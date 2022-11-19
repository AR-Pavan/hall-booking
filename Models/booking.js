const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new mongoose.Schema(
  {
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    dates: {
      type: [Date],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
