import {Component} from '@nestjs/common';
import * as fetch from 'node-fetch';


@Component()
export class WorkerVkService {

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
            urls.push(`https://api.vk.com/method/wall.get?owner_id=-${group}&v=5.62&access_token=${token}`)
        }
        return urls;
    }
}