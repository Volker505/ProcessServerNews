import {
    Controller,
    Get,
    Post,
    Body,
    Param, Delete, Put,
} from '@nestjs/common';
import {UserDto} from './dto/user.dto';
import {UpdatingPortalsDto} from './dto/updatingPortals.dto';
import {WorkerVkService} from '../workers/worker-vk.service';
import {WorkerGtService} from '../workers/worker-gt.service';
import {WorkerFbService} from '../workers/worker-fb.service';
import {ReqProcessingService} from './req-processing-service';


@Controller('api')
export class ReqProcessingController {
    constructor(private workerVkService: WorkerVkService,
                private workerGtService: WorkerGtService,
                private workerFbService: WorkerFbService,
                private reqProcessingService: ReqProcessingService) {}
    //
    // @Post('add-portals')
    // async addNewPortal(@Body() portal: UpdatingPortalsDto): Promise<any> {
    //     return await this.reqProcessingService.addNewPortal(portal);
    // }

    @Put('put-portals')
    async updateNewPortal(@Body() portal: UpdatingPortalsDto): Promise<any> {
        return await this.reqProcessingService.updateNewPortal(portal);
    }

    @Delete('del-portals')
    async deleteNewPortal(@Body() portal: UpdatingPortalsDto): Promise<any> {
        return await this.reqProcessingService.deleteNewPortal(portal);
    }
    // в следующих 3-х обработчиках необходимо проверить наличие непрочитанных актуальных новостей если они есть то
    //вернуть при этом каждые сутки необходимо обновлять эти данные и выставлять их как false
    @Get('news-td/:chatId')//сегодня или актуальные
    async getNewsForUser(@Param() params): Promise<any> {//userId это idchat bot
        //при обраблотке данного запроса необходимо создать несколько NewsForUserSchema для каждого портала свой
        //вернуть пользователю только нужное кол-во информации (для vk как ждого типа по 2) (для gt 1 пост)
    }

    @Get('actualNews_vk/:id')
    async getNewsVk(@Param() params): Promise<any> {
        return await this.workerVkService.getActualNews(params.id);
    }

    @Get('actualNews_gt/:id')
    async getNewsGt (@Param() params): Promise<any>{
        return await this.workerGtService.getActualNews(params.id);
    }

    @Get('actualNews_fb/:id')
    async getNewsFb(@Param() params): Promise<any>{
        return await this.workerFbService.getActualNews(params.id);
    }

}
