import {Component, Inject} from '@nestjs/common';
import * as fetch from 'node-fetch';
import {DataOauth,} from './dto/dataOauth';
import {Model} from 'mongoose';
import {SocNetInterface} from './interfaces/soc-net.interface';
import {oauthModelToken, preferencesModelToken, userModelToken} from '../../database/provides';
import {UserInterface} from '../req-processing/interfaces/user.interface';
import {DataRegistration} from './dto/dataRegistration';
import {PreferencesInterface} from '../req-processing/interfaces/preferences.interface';
import {WorkerVkService} from '../workers/worker-vk.service';


@Component()
export class OauthService {
    constructor(
        @Inject(oauthModelToken) private readonly oauthSocNet: Model<SocNetInterface>,
        @Inject(userModelToken) private readonly user: Model<UserInterface>,
        @Inject(preferencesModelToken) private readonly preferences: Model<PreferencesInterface>,
        private workerVkService: WorkerVkService) {
    }

    async linkVk(data: DataOauth) {
        const user = await this.user.findOne({idChatUser: data.idChat});//id чата может не быть

        if (!user) { return; }// status code 401

        let socNetInfo = await this.oauthSocNet.findOne({userId: data.dataSocNetUser.user_id});
        if (!socNetInfo) {
            socNetInfo = new this.oauthSocNet({
                userId: data.dataSocNetUser.user_id,
                token: data.dataSocNetUser.access_token,
                exId: data.dataSocNetUser.expires_in
            });
        } else {
            socNetInfo.token = data.dataSocNetUser.access_token;
            socNetInfo.exId = data.dataSocNetUser.expires_in;
            try {
                await socNetInfo.save(err => {
                    if (err) throw err;
                });
            }
            catch (err) {
                console.log('err update save', err);
                return err;
            }
        }

        user.userInVk = socNetInfo;

        let groups = await this.workerVkService.getUrlGroups(data.dataSocNetUser.user_id, data.dataSocNetUser.access_token);
        if (groups && groups.length != 0) {
            const preferences = new this.preferences({namePortal: 'vk', urls: groups});

            const index = user.preferences.findIndex(item => item.namePortal == 'vk');

            index == -1 ? user.preferences.push(preferences) : user.preferences[index] = preferences;
        }

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

    async linkFb(data: DataOauth) {

    }

    async registrationNewUser(data: DataRegistration) {
        let user = await this.user.findOne({idChatUser: data.chatId});

        if (user) {
            return user;
        }
        user = new this.user({name: data.userName, idChatUser: data.chatId});

        try {
            user.save(err => {
                if (err) throw err;
            });
        }
        catch (err) {
            console.log('err save on db', err);
            return err;
        }

        return user;
    }
}
