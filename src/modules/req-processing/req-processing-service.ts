import {Component, Inject} from '@nestjs/common';
import * as fetch from 'node-fetch';
import {userModelToken, preferencesModelToken} from '../../database/provides';
import {Model} from 'mongoose';
import {UserInterface} from './interfaces/user.interface';
import {WorkerService} from '../workers/worker.service';
import {UpdatingPortalsDto} from './dto/updatingPortals.dto';
import {PreferencesInterface} from './interfaces/preferences.interface';
import {StatusResponse} from './dto/statusResponse';


@Component()
export class ReqProcessingService {
    constructor(@Inject(userModelToken) private readonly users: Model<UserInterface>,
                @Inject(preferencesModelToken) private readonly preferences: Model<PreferencesInterface>,
                private  workerService: WorkerService) {

    }

    public async getNewsForUser(userId: string) {
        const user = await this.users.findOne({idChatUser: userId});//получение user по id чата teleg

    }

    // public async addNewPortal (portal: UpdatingPortalsDto){
    //     const user = await this.users.findOne({idChatUser: portal.userId});
    //     if (this.isPortal(portal, user)) { return; }
    //
    //     const preference = new this.preferences({namePortal: portal.namePortal, urls: portal.portals});
    //
    //     user.preferences.push(preference);
    //
    //     user.save(err => {
    //         if (err) {
    //             console.log('err update linck soc net vk ', err);
    //         }
    //     })
    // }

    public async updateNewPortal(portal: UpdatingPortalsDto) {
        const user = await this.users.findOne({idChatUser: portal.userId});
        const portalIndex = await this.isPortal(portal, user);
        if (portalIndex == -1) { return; }
        user.preferences[portalIndex].urls = portal.portals;
        user.save(err => {
            if (err) {
                console.log('err 221', err);
            }
        });
        return new StatusResponse('ok');
    }

    public async deleteNewPortal(portal: UpdatingPortalsDto) {
        const user = await this.users.findOne({idChatUser: portal.userId});
        const portalIndex = await this.isPortal(portal, user);
        if (portalIndex == -1) { return; }
        user.preferences.splice(portalIndex, 1);
        user.save(err => {
            if (err) {
                console.log('err 221', err);
            }
        });
        return new StatusResponse('ok');
    }

    private async isPortal(portal: UpdatingPortalsDto, user: any) {
        return user.preferences.findIndex(item => item.namePortal == portal.namePortal)
    }

}
