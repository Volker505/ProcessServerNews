import * as mongoose from 'mongoose'
import {NewsSchema} from './news.schema';

export const NewsForUserSchema = new mongoose.Schema({
    userId: {
        type: String, //todo возможет тип objectId
        required: true,
        unique: true
    },

    news: {
        type: [NewsSchema]
    },

    relevant: Boolean   //акутальность новостей true-пользователь не видел новости
});