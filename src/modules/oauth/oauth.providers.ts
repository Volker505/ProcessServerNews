import { Connection } from 'mongoose';
import {SocNetSchema} from '../../database/schems/soc-net.schema';
import {oauthModelToken} from '../../database/provides';


export const oauthProviders = [
    {
        provide: oauthModelToken,
        useFactory: (connection: Connection) => connection.model('Oauth', SocNetSchema),
        inject: ['dbConnectionToken'],
    },
];

