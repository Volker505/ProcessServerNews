import * as mongoose from 'mongoose'


export const SocNetSchema = new mongoose.Schema({
    userId: {
        type: Number
    },
    token: {
        type: String
    },
    code: {
        type: String
    },
    exId: {
        type: String
    }
});