import { Module } from '@nestjs/common';
import {DatabaseModule} from '../../database/database.module';
import {WorkerVkService} from './worker-vk.service';
import {WorkerFbService} from './worker-fb.service';
import {oauthProviders} from '../oauth/oauth.providers';
import {reqProcessingProviders} from '../req-processing/req-processing.providers';

@Module({
    imports: [DatabaseModule],
    components: [
        WorkerVkService,
        WorkerFbService,
        ...oauthProviders,
        ...reqProcessingProviders
    ],
    exports: [
        WorkerVkService,
        WorkerFbService
    ]
})
export class WorkerModule {


}
