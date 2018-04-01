import * as mongoose from 'mongoose'
import {PreferencesSchema} from './preferences.schema';

export const UserShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    idChatUser: {
        type: String,
        required: true,
        unique: true
    },

    userIdVk: {
        type: String
    },

    userIdFb: {
        type: String
    },

    todayAction: {  //утро день вечер ночь
        type: String,
    },

    preferences: {
        type: [PreferencesSchema]
    }
});