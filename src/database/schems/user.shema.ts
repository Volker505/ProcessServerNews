import * as mongoose from 'mongoose'
import {PreferencesSchema} from './preferences.schema';
import {SocNetSchema} from './soc-net.schema';
import {NewsForUserSchema} from './news-for-user.schema';

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

    userInVk: {
        type: SocNetSchema
    },

    userInFb: {
        type: SocNetSchema
    },

    todayAction: {  //утро день вечер ночь
        type: String,
    },

    preferences: {
        type: [PreferencesSchema]
    },

    allNews: {
        type: [NewsForUserSchema]
    },

});