import {Component, Inject} from '@nestjs/common';
import * as fetch from 'node-fetch';
import {Model} from 'mongoose';
import {userModelToken} from '../../database/provides';
import {UserInterface} from '../req-processing/interfaces/user.interface';
import {WallVkDto} from './dto/wallVk.dto';
import {async} from 'rxjs/scheduler/async';


@Component()
export class WorkerVkService {

    constructor(@Inject(userModelToken) private readonly user: Model<UserInterface>) {
    }

    public async getRelevantSample(userIdVk: string) {

    }

    public async getUrlGroups(userId: number, token: string): Promise<string[]> {
        const groups = await fetch(`https://api.vk.com/method/groups.get?user_id=${userId}&access_token=${token}&v=5.62`)
            .then(data => data.json())
            .then(res => res.response.items);

        if (!groups || groups == [])
            return null;

        groups.splice(Math.floor(groups.length / 2));//половина массива

        let urls = [];
        for (let group of groups) {
            urls.push(`https://api.vk.com/method/wall.get?owner_id=-${group}&count=32&v=5.62&access_token=${token}`)
        }
        return urls;
    }

    public async getActualNew(id: number) {
        const user = await this.user.findOne({idChatUser: id});

        const portalVk = await user.preferences.find(item => item.namePortal == 'vk');

        if (!portalVk) {
            return;
        }// status code 404

        let allPost: WallVkDto[] = [];
        let i = 0;
        // console.log('item oooo ', portalVk.urls.length);
        // for (let url of portalVk.urls) {
        //     fetch(url)
        //         .then(data => data.json())
        //         .then(res => res.response)
        //         .then(posts => console.log(posts.count));
        //     // let posts = await response.json();
        //     // // .then(data => data.json())
        //     // // .then(data => data.response);
        //     // allPost.push(posts.response);
        //     // console.log(posts.response == undefined ? url : 'good');
        // }

        // console.log(allPost.length);
        allPost[0] = await fetch(portalVk.urls[0]).then(data => data.json()).then(res => res.response);
        allPost[1] = await fetch(portalVk.urls[1]).then(data => data.json()).then(res => res.response);
        allPost[2] = await fetch(portalVk.urls[2]).then(data => data.json()).then(res => res.response);
        allPost[3] = await fetch(portalVk.urls[3]).then(data => data.json()).then(res => res.response);
        allPost[4] = await fetch(portalVk.urls[4]).then(data => data.json()).then(res => res.response);
        allPost[5] = await fetch(portalVk.urls[5]).then(data => data.json()).then(res => res.response);
        allPost[6] = await fetch(portalVk.urls[6]).then(data => data.json()).then(res => res.response);
        allPost[7] = await fetch(portalVk.urls[7]).then(data => data.json()).then(res => res.response);
        allPost[8] = await fetch(portalVk.urls[8]).then(data => data.json()).then(res => res.response);
        allPost[9] = await fetch(portalVk.urls[9]).then(data => data.json()).then(res => res.response);
        allPost[10] = await fetch(portalVk.urls[10]).then(data => data.json()).then(res => res.response);
        allPost[11] = await fetch(portalVk.urls[11]).then(data => data.json()).then(res => res.response);
        allPost[12] = await fetch(portalVk.urls[12]).then(data => data.json()).then(res => res.response);
        allPost[13] = await fetch(portalVk.urls[13]).then(data => data.json()).then(res => res.response);
        allPost[14] = await fetch(portalVk.urls[14]).then(data => data.json()).then(res => res.response);
        allPost[15] = await fetch(portalVk.urls[15]).then(data => data.json()).then(res => res.response);
        allPost[16] = await fetch(portalVk.urls[16]).then(data => data.json()).then(res => res.response);


        console.log(allPost);
        // await portalVk.urls.forEach(async (url, index, arr) => {
        //
        //     if (i>5) return;
        //     i++;
        //     let response = await fetch(url);
        //     let posts = await response.json();
        //     // .then(data => data.json())
        //     // .then(data => data.response);
        //
        //     console.log('index  ', index);
        //     console.log(posts.response.count.toString());
        //
        //
        //     // await this.postFilteringPerDay(Date.now(), posts);
        //     // allPost.push(posts);
        // });
        // return allPost;
    }

    private async postFilteringPerDay(date: number, posts: WallVkDto) {

        //unix time -86400
        posts.items = posts.items.filter(post => post.date >= date - 86400);

    }
}