import {Module} from '@nestjs/common';
import {ReqProcessingController} from './req-processing.controller';

@Module({
    controllers: [
        ReqProcessingController
    ]

})
export class ReqProcessingModule {
}
