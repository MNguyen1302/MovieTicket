import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "Cinema",
    mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        cluster: {
            type: String,
            enum: ['cgv', 'lotte', 'galaxy', 'dcine', 'bhd'],
            required: true
        },
        logo: {
            type: String
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    }, modelOptions)
)

