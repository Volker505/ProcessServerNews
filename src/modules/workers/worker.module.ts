import { Module } from '@nestjs/common';
import {DatabaseModule} from '../../database/database.module';
import {WorkerVkService} from './worker-vk.service';
import {WorkerFbService} from './worker-fb.service';
import {oauthProviders} from '../oauth/oauth.providers';
import {reqProcessingProviders} from '../req-processing/req-processing.providers';
import {WorkerGtService} from './worker-gt.service';

@Module({
    imports: [DatabaseModule],
    components: [
        WorkerVkService,
        WorkerFbService,
        WorkerGtService,
        ...oauthProviders,
        ...reqProcessingProviders
    ],
    exports: [
        WorkerVkService,
        WorkerFbService,
        WorkerGtService
    ]
})
export class WorkerModule {


}
