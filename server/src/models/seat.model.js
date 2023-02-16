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
        type: {
            type: Schema.Types.ObjectId,
            ref: "SeatType",
            required: true
        },
        row: {
            type: String,
            required: true
        },
        column: {
            type: Number,
            required: true
        },
        isBooking: {
            type: Number,
            enum: [0, 1],
            required: true
        }
    }, modelOptions)
)