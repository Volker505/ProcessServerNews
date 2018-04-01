import * as mongoose from 'mongoose'

export const PreferencesSchema = new mongoose.Schema({
    namePortal: {
        type: String,
        required: true
    },

    urls: { //тут могкт быть указаны url всех групп пользователя (VK FB) или другие порталы
        type: [String]
    }

});