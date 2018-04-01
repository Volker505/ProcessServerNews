import {
    Controller,
    Get,
    Post,
    Body,
    Param,
} from '@nestjs/common';
import {UserDto} from './dto/user.dto';
import {UpdatingPortalsDto} from './dto/updatingPortals.dto';



@Controller('api')
export class ReqProcessingController {
    constructor() {
    }


    @Post('add-user')
    async addNewUser(@Body() user: UserDto): Promise<any> {

    }

    @Post('add-portals')
    async addNewPortal(@Body() portal: UpdatingPortalsDto): Promise<any> {

    }

    @Post('del-portals')
    async deleteNewPortal(@Body() portal: UpdatingPortalsDto): Promise<any> {

    }

    @Get('news-td/:userId')//сегодня или актуальные
    async getNewsForUser(@Param() params): Promise<any> {
        return params.userId;
    }

}
