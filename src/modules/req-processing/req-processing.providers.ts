import {Connection} from 'mongoose';
import {
    dbConnectionToken,
    newsForUserModelToken,
    newsModelToken,
    preferencesModelToken,
    userModelToken
} from '../../database/provides';
import {NewsSchema} from '../../database/schems/news.schema';
import {NewsForUserSchema} from '../../database/schems/news-for-user.schema';
import {PreferencesSchema} from '../../database/schems/preferences.schema';
import {UserShema} from '../../database/schems/user.shema';


export const reqProcessingProviders = [
    {
        provide: newsModelToken,
        useFactory: (connection: Connection) => connection.model('news', NewsSchema),
        inject: [dbConnectionToken],
    },
    {
        provide: newsForUserModelToken,
        useFactory: (connection: Connection) => connection.model('newsForUser', NewsForUserSchema),
        inject: [dbConnectionToken],
    },
    {
        provide: preferencesModelToken,
        useFactory: (connection: Connection) => connection.model('preferences', PreferencesSchema),
        inject: [dbConnectionToken],
    },
    {
        provide: userModelToken,
        useFactory: (connection: Connection) => connection.model('user', UserShema),
        inject: [dbConnectionToken],
    }
];

