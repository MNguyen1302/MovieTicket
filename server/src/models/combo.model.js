import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "Combo",
    mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        image_path: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        cluster: {
            type: String,
            enum: ['cgv', 'lotte', 'galaxy', 'dcine', 'bhd'],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        isSelling: {
            type: Boolean,
            required: true
        }
    }, modelOptions)
)