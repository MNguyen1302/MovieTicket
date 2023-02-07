import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "ScheduleSeat",
    mongoose.Schema({
        seatId: {
            type: Schema.Types.ObjectId,
            ref: "Seat",
            required: true
        },
        scheduleId: {
            type: Schema.Types.ObjectId,
            ref: "Schedule",
            required: true
        },
        bookingId: {
            type: Schema.Types.ObjectId,
            ref: "Booking",
            required: true
        },
        status: {
            type: Number,
            enum: [-1, 0],
            required: true
        }
    }, modelOptions)
)