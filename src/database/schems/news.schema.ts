import * as mongoose from 'mongoose'

export const NewsSchema = new mongoose.Schema({
    titleNews: {
        type: String,
        required: true
    },

    bodyNews: {
        type: String,
    },

    link: {
        type: String,
        required: true
    },

    photo: {
        type: String,
    },

    created: {
        type: Date,
        default: Date.now()
    }
});