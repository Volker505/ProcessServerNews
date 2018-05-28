import * as mongoose from 'mongoose'
import {NewsSchema} from './news.schema';

export const NewsForUserSchema = new mongoose.Schema({

    creationDate: {
        type: Date,
        default: Date.now(),
    },

    typePortal: String,

    news: {
        type: [NewsSchema]
    },

    relevant: {type: Boolean, default: true}  //акутальность новостей true-пользователь не видел новости
});