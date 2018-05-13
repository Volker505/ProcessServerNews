import {Component, Inject} from '@nestjs/common';
import * as fetch from 'node-fetch';
import {Model} from 'mongoose';
import * as Parser from  'rss-parser';
import {UserInterface} from '../req-processing/interfaces/user.interface';
import {preferencesModelToken, userModelToken} from '../../database/provides';
import {PreferencesInterface} from '../req-processing/interfaces/preferences.interface';
import {WallGtDto} from './dto/wallGt.dto';

@Component()
export class WorkerGtService {
    public parserRss: Parser = new Parser();

    constructor(
        @Inject(userModelToken) private readonly user: Model<UserInterface>,
        @Inject(preferencesModelToken) private readonly preferences: Model<PreferencesInterface>,
    ){}


    public async linkGeekTimes (idChat: number){
        const user = await this.user.findOne({idChatUser: idChat});

        const portla = await user.preferences.find(item => item.namePortal == 'gt');
        if (portla) { return; }

        const preference = new this.preferences ({namePortal: 'gt', urls: ['https://geektimes.com/rss/hubs/all/']});

        user.preferences.push(preference);
        try {
            await user.save(err => {
                if (err) {
                    console.log('err update linck soc net vk ',err);
                    throw err;
                }
            })
        }
        catch (err) {
            return err;
        }
    }

    public async getActualNews (idChat: number){
        const dataGt: WallGtDto = await this.parserRss.parseURL('https://geektimes.com/rss/hubs/all/');
        // console.log(res.items.length);

        dataGt.items.forEach(item => console.log(item.pubDate));
    }


}