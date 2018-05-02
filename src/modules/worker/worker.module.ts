import { Module } from '@nestjs/common';
import {DatabaseModule} from '../../database/database.module';
import {WorkerVkService} from './worker-vk.service';
import {WorkerFbService} from './worker-fb.service';

@Module({
    imports: [DatabaseModule],
    components: [
        WorkerVkService,
        WorkerFbService
    ],
    exports: [
        WorkerVkService,
        WorkerFbService
    ]
})
export class WorkerModule {


}
