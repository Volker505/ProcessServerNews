import {
    Controller,
    Get,
    Post,
    Body,
    Param, Delete,
} from '@nestjs/common';
import {UserDto} from './dto/user.dto';
import {UpdatingPortalsDto} from './dto/updatingPortals.dto';
import {WorkerVkService} from '../worker/worker-vk.service';


@Controller('api')
export class ReqProcessingController {
    constructor(private workerVkService: WorkerVkService
    ) {}

    @Post('add-portals')
    async addNewPortal(@Body() portal: UpdatingPortalsDto): Promise<any> {

    }

    @Delete('del-portals')
    async deleteNewPortal(@Body() portal: UpdatingPortalsDto): Promise<any> {

    }

    @Get('news-td/:chatId')//сегодня или актуальные
    async getNewsForUser(@Param() params): Promise<any> {//userId это idchat bot

    }

    @Get('actualNews_vk/:id')
    async getNewsVk(@Param() params): Promise<any> {
        await this.workerVkService.getActualNew(params.id);
    }

}
