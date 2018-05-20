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

        portalGT.urls.forEach(async item => {
            dataGt = await this.parserRss.parseURL(item);

            dataGt.items.forEach(item => {
               const contentObj: Content = this.parseService.parseXmlContent(item.content);
               item.content = contentObj.text;
               item.img = contentObj.img;
            });
        });


    }


}