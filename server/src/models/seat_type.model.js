import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "SeatType",
    mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        surcharge: {
            type: Number,
            required: true
        },
    }, modelOptions)
)