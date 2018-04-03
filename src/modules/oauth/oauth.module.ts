import {Module} from '@nestjs/common';
import {OauthController} from './oauth.controller';
import {OauthService} from './oauth.service';
import {DatabaseModule} from '../../database/database.module';
import {oauthProviders} from './oauth.providers';
import {reqProcessingProviders} from '../req-processing/req-processing.providers';

@Module({
    imports: [
        DatabaseModule
    ],

    controllers: [
        OauthController
    ],
    components: [
        OauthService,
        ...oauthProviders,
        ...reqProcessingProviders
    ]
})

export class OauthModule {
}
