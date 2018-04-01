import {Component} from '@nestjs/common';
import * as fetch from 'node-fetch';
import {DataOauth, fbId, fbSec, vkId, vkSec} from './dto/dataOauth';


@Component()
export class OauthService {
    constructor() {
    }

    async linkVk(data: DataOauth) {
        await fetch(`https://oauth.vk.com/access_token?client_id=${vkId}&client_secret=${vkSec}
                     &redirect_uri=http://localhost:8080/&code=${data.code}`)
            .then(res => {
                console.log(res)
            });
        //todo добавить в бд данные поиск по idChat
        //todo возможно нужен запрос на бота
    }

    async linkFb(data: DataOauth) {
        await fetch(`https://graph.facebook.com/v2.12/oauth/access_token?client_id=${fbId}
                    &redirect_uri=http://localhost:8080/&client_secret=${fbSec}&code=${data.code}`)
            .then(res => {
                console.log(res);
            })
    }

}
