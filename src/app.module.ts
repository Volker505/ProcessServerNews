import {Module} from '@nestjs/common';
import {ReqProcessingModule} from './modules/req-processing/req-processing.module';
import {DatabaseModule} from './database/database.module';
import {OauthModule} from './modules/oauth/oauth.module';

@Module({
    imports: [
        ReqProcessingModule,
        OauthModule,
        DatabaseModule,
    ],

})
export class ApplicationModule {
}
