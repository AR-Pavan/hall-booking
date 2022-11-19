const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const Room = require("./Models/room");
const User = require("./Models/user");
const userRouter = require("./Routes/userRouter");
const { options } = require("./Routes/userRouter");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONGO_URL,
    (err) => {
        if(err)console.log(err)
    else console.log("Mongo DB is connected");
  }
);

app.get("/", (req, res) => {
  res.send("Welcome to hall-booking");
});

app.use("/user", userRouter);

//create Room
app.post("/createRoom", async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(200).send(newRoom);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/rooms", async (req, res) => {
  try {
    const roomsData = await Room.find({});
    res.status(200).send(roomsData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/book/:roomId", async (req, res) => {
  try {
    //update room
    const updateRoomAvailability = await Room.updateOne(
      { _id: req.params.roomId },
      {
        $set: {
          isBooked: true,
          bookedBy: req.body.bookedBy,
          bookDate: req.body.bookedDate,
        },
      }
    );
    //update user booked room status
    const updateUser = await User.updateOne(
      { _id: req.body.bookedBy },
      { $set: { hasBookedRoom: true, bookedRoom: req.params.roomId } }
    );

    res.status(200).send(updateUser,"room and user updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//List all rooms with book data (room name,booked status,customer name,date,start time,end time)
app.get("/bookedrooms", async (req, res) => {
  try {
    const bookedRooms = await Room.find({ isBooked: true }).populate(
      "bookedBy",
      "name"
    );
    res.status(200).send(bookedRooms);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//list all customers with booked data with (customer name, room name, date, start time, end time)
app.get("/users/bookings", async (req, res) => {
  try {
    const customers = await User.find({ hasBookedRoom: true }).populate(
      "bookedRoom"
    );
    res.status(200).send(customers);
  } catch (err) {
    res.status(500).send({ res: "unsuccessful", error: err.message });
  }
});
app.listen(process.env.PORT, () => console.log(`Server started...${process.env.PORT}`));
