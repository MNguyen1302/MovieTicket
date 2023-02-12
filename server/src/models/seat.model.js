import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "Seat",
    mongoose.Schema({
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },
        seatNumber: {
            type: Number,
            required: true
        },
        seatType: {
            type: Schema.Types.ObjectId,
            ref: "SeatType",
            required: true
        },
        row: {
            type: String,
            required: true
        },
        isBooking: {
            type: Number,
            enum: [0, 1],
            required: true
        }
    }, modelOptions)
)