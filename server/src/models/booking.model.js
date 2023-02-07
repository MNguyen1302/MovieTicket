import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "Booking",
    mongoose.Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        scheduleId: {
            type: Schema.Types.ObjectId,
            ref: "Schedule",
            required: true
        },
        seatId: {
            type: Schema.Types.ObjectId,
            ref: "Seat",
            required: true 
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: Number
        }
    }, modelOptions)
)