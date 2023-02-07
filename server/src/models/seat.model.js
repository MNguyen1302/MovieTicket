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
            type: String,
            required: true
        },
        seatType: {
            type: String,
            enum: ["Regular", "Premium"],
            required: true
        },
        row: {
            type: String,
            required: true
        }
    }, modelOptions)
)