import {Component, Inject} from '@nestjs/common';
import * as fetch from 'node-fetch';
import {userModelToken} from '../../database/provides';
import {Model} from 'mongoose';
import {UserInterface} from './interfaces/user.interface';


@Component()
export class ReqProcessingService {
    constructor(@Inject('userModelToken') private readonly users: Model<UserInterface>,
                ) {

    }

    async getNewsForUser(userId: string) {
        const user = await this.users.findOne({idChatUser: userId});//получение user по id чата teleg

    }

}
