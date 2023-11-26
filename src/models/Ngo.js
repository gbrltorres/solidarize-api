import mongoose from "mongoose";

export const Ngo = mongoose.model('ngo', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    interests: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: false
    },
}))
