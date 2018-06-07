import {Body, Controller, Request, Get, Param, Post, Query} from '@nestjs/common';
import {OauthService} from './oauth.service';
import {DataOauth} from './dto/dataOauth';
import {DataRegistration} from './dto/dataRegistration';


@Controller('oauth')
export class OauthController {
    constructor(private oauthService: OauthService) {
    }

    @Post('vk')
    async oauthVk(@Body() data: DataOauth): Promise<any> {
        return await this.oauthService.linkVk(data);
    }

    @Post('fb')
    async oauthFb(@Body() data: DataOauth): Promise<any> {
        return await this.oauthService.linkFb(data);
    }

    @Post('registration')
    async registration(@Body() data: DataRegistration): Promise<any>{
        return await this.oauthService.registrationNewUser(data);
    }
}
