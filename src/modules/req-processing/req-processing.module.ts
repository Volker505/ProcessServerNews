import {Module} from '@nestjs/common';
import {ReqProcessingController} from './req-processing.controller';
import {DatabaseModule} from '../../database/database.module';
import {reqProcessingProviders} from './req-processing.providers';

@Module({
    imports: [
        DatabaseModule
    ],

    controllers: [
        ReqProcessingController
    ],

    components: [
        ...reqProcessingProviders
    ]

})
export class ReqProcessingModule {
}
