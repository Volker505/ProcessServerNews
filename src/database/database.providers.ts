import * as mongoose from 'mongoose';
import {dbConnectionToken} from './provides';

export const databaseProviders = [
    {
        provide: dbConnectionToken,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect('mongodb://localhost/newsForUsers', {
            });
        },
    },
];