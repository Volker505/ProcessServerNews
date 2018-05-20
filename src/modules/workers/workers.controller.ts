import {Controller, Get, Param} from '@nestjs/common';
import {WorkerGtService} from './worker-gt.service';

@Controller('link')
export class WorkersController {
    constructor(private workerGtService: WorkerGtService){}

    @Get('GT/:id')
    async linkGtPortal(@Param() params){
        await this.workerGtService.linkGeekTimes(params.id);
    }

}
