import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "Room",
    mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        cinemaId: {
            type: Schema.Types.ObjectId,
            ref: "Cinema",
            required: true
        },
        totalSeats: {
            type: Number,
            required: true
        }
    }, modelOptions)
)