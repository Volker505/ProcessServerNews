import {Module} from '@nestjs/common';
import {ReqProcessingModule} from './modules/req-processing/req-processing.module';
import {DatabaseModule} from './database/database.module';
import {OauthModule} from './modules/oauth/oauth.module';
import {WorkerModule} from './modules/workers/worker.module';

@Module({
    imports: [
        ReqProcessingModule,
        OauthModule,
        DatabaseModule,
        WorkerModule,
    ],

})
export class ApplicationModule {
}
