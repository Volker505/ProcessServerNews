import {Module} from '@nestjs/common';
import {ReqProcessingController} from './req-processing.controller';
import {DatabaseModule} from '../../database/database.module';
import {reqProcessingProviders} from './req-processing.providers';
import {ReqProcessingService} from './req-processing-service';
import {WorkerModule} from '../workers/worker.module';

@Module({
    imports: [
        DatabaseModule,
        WorkerModule
    ],

    controllers: [
        ReqProcessingController
    ],

    components: [
        ReqProcessingService,
        ...reqProcessingProviders
    ]

})
export class ReqProcessingModule {
}
