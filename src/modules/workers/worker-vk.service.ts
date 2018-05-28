import {Component, Inject} from '@nestjs/common';
import * as fetch from 'node-fetch';
import {Model} from 'mongoose';
import {userModelToken} from '../../database/provides';
import {UserInterface} from '../req-processing/interfaces/user.interface';
import {TypedVkContent, WallElement, WallVkDto} from './dto/wallVk.dto';
import {AnalysisVkRecordService} from './analysis-vk-record.service';

@Component()
export class WorkerVkService {

    constructor(@Inject(userModelToken) private readonly user: Model<UserInterface>,
                private analysisVkRecordService: AnalysisVkRecordService) {
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
            urls.push(`https://api.vk.com/method/wall.get?owner_id=-${group}&count=40&v=5.62&access_token=${token}`)
        }
        return urls;
    }

    public async getActualNews(id: number) {// смотри алгоритм при вызове метода
        const user = await this.user.findOne({idChatUser: id});

        const portalVk = await user.preferences.find(item => item.namePortal == 'vk');

        if (!portalVk) {
            return;
        }// status code 404

        let allPost: WallVkDto[] = [];

        let groupVk = portalVk.urls.filter((item, index) => index < 9);

        allPost.push(...await this.requestOnPosts(groupVk));//результат первые 9х32 поста
        await this.timeOut(3000);
        groupVk = portalVk.urls.filter((item, index) => index >= 9 && index < 18);
        allPost.push(...await this.requestOnPosts(groupVk));//результат 9х40 поста
        this.postFilteringPerDay(parseInt('' + Date.now() / 1000), allPost);
        //todo  добавление в базу как новость
        return this.getResObjectVk(this.getWallByRating(allPost)).links;
    }

    private addNewsToDB (vkContetn: TypedVkContent){ //todo реализация
        //добаление в базу данных по 8 постов каждого типа
        //при этом записывать их все в одну схему NewsForUserSchema с типом VK
    }

    private async requestOnPosts(urls: string[]) {
        let arrWall: WallVkDto[] = [];
        for (let url of urls) {
            let group = await fetch(url).then(data => data.json()).then(res => res.response);
            arrWall.push(group);
        }
        return arrWall;
    }

    private postFilteringPerDay(date: number, groups: WallVkDto[]) {
        for (let posts of groups) {
            //unix time -86400
            posts.items = posts.items.filter(post => post.date >= date - 86400);
        }
    }

    private getWallByRating(arrWall: WallVkDto[]): WallElement[] {// WallVkDto[]
        let currentPosts: WallElement[] = [];
        for (let posts of arrWall) {
            posts.items = this.groupRating(posts.items);
            this.sortRecord(posts.items);

            // if (posts.items[0] && posts.items[1]) {// todo изменить
            //     currentPosts.push(posts.items[0], posts.items[1]);
            // }
            currentPosts.push(...posts.items);
        }
        this.sortRecord(currentPosts);

        return currentPosts
    }

    private groupRating(wall: WallElement[]) {
        let likes = 0;
        let rePosts = 0;
        let comments = 0;

        wall.forEach(record => {
            this.analysisVkRecordService.setTypeVkRecord(record);
            comments += record.comments.count;
            rePosts += record.reposts.count;
            likes += record.likes.count;
        });

        wall.forEach(record => {
            record['rating'] = record.likes.count / (likes == 0 ? 1 : likes) + (record.reposts.count / (rePosts == 0 ? 1 : rePosts) * 5)
                + (record.comments.count / (comments == 0 ? 1 : comments) * 10);
        });

        return wall;
    }

    private sortRecord(wall: WallElement[]) {
        wall.sort((a, b) => {
            if (a['rating'] < b['rating']) {
                return 1
            }
            if (a['rating'] > b['rating']) {
                return -1
            }
            return 0;
        });
    }

    private getResObjectVk(wallAll: WallElement[]): TypedVkContent{
        const content = new TypedVkContent();

        for (let item of wallAll) {
            switch (item['type']) {
                case 'photo':
                    content.photos.push(item);
                    break;
                case 'article':
                    content.articles.push(item);
                    break;
                case 'gif':
                    content.gifs.push(item);
                    break;
                case 'link':
                    content.links.push(item);
                    break;
                default:
                    content.other.push(item);
            }
        }
        return content;
    }

    private timeOut(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}