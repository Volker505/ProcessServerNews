import * as mongoose from 'mongoose'

export const NewsSchema = new mongoose.Schema({
    titleNews: {
        type: String,
        required: true
    },

    bodyNews: {
        type: String,
    },

    links: {
        type: [String],
    },

    photos: {
        type: [String],
    },

    created: {
        type: Date,
        default: Date.now()
    },

    like: Boolean,

    relevant: {type: Boolean, default: true}

});