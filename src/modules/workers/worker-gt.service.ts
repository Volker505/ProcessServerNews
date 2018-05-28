import {Component, Inject} from '@nestjs/common';
import * as fetch from 'node-fetch';
import {Model} from 'mongoose';
import * as Parser from 'rss-parser';
import * as xmlParser from 'xml2js';
import {UserInterface} from '../req-processing/interfaces/user.interface';
import {preferencesModelToken, userModelToken} from '../../database/provides';
import {PreferencesInterface} from '../req-processing/interfaces/preferences.interface';
import {WallGtDto} from './dto/wallGt.dto';
import {Content, ParseService} from './parse.service';
import {TypedVkContent} from './dto/wallVk.dto';

@Component()
export class WorkerGtService {
    public parserRss: Parser = new Parser();

    constructor(
        @Inject(userModelToken) private readonly user: Model<UserInterface>,
        @Inject(preferencesModelToken) private readonly preferences: Model<PreferencesInterface>,
        private parseService: ParseService) {
    }


    public async linkGeekTimes(idChat: number) {
        const user = await this.user.findOne({idChatUser: idChat});

        const portla = await user.preferences.find(item => item.namePortal == 'gt');
        if (portla) {
            return;
        }

        const preference = new this.preferences({namePortal: 'gt', urls: ['https://geektimes.com/rss/hubs/all/']});

        user.preferences.push(preference);
        try {
            await user.save(err => {
                if (err) {
                    console.log('err update linck soc net vk ', err);
                    throw err;
                }
            })
        }
        catch (err) {
            return err;
        }
    }

    public async getActualNews(idChat: number) {
        const user = await this.user.findOne({idChatUser: idChat});

        const portalGT = await user.preferences.find(portal => portal.namePortal == 'gt');
        if (!portalGT) {
            return;
        }

        let dataGt: WallGtDto;

        for (let url of portalGT.urls){
            dataGt = await this.parserRss.parseURL(url);

            dataGt.items.forEach(article => {
                const contentObj: Content = this.parseService.parseXmlContent(article.content);
                article.content = contentObj.text;
                article.img = contentObj.img;
            });

        }

        //todo добавть в базу как новость
        //взаимодействие с неронной сетью

        const index = 9;// Math.random() * (dataGt.items.length - 1);
        console.log(Math.floor(index), dataGt.items.length);
        console.log(dataGt.items[index+1]);//тестовое выходное значение

    }

    private addNewsToDB (vkContetn: TypedVkContent){ //todo реализация
    }

}