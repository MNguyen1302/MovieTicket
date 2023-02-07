import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "Schedule",
    mongoose.Schema({
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },
        movieId: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Available", "Full"]
        }
    }, modelOptions)
)