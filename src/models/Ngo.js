import mongoose from "mongoose";

export const Ngo = mongoose.model('ngo', new mongoose.Schema({
    orgName: {
        type: String,
        required: true
    },
    orgCode: {
        type: String,
        required: true
    },
    orgPhoneNumber: {
        type: String,
        required: true
    },
    orgPassword: {
        type: String,
        required: true
    },
    interests: {
        type: Array,
        required: true
    },
}))
