import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {OauthService} from './oauth.service';
import {DataOauth} from './dto/dataOauth';


@Controller('oauth')
export class OauthController {
    constructor(private oauthService: OauthService) {
    }


    @Post('vk')
    async oauthVk(@Body() data: DataOauth): Promise<any> {
        this.oauthService.linkVk(data);
    }

    @Post('fb')
    async oauthFb(@Body() data: DataOauth): Promise<any> {
        this.oauthService.linkFb(data);
    }
}
