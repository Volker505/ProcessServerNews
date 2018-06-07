import {Component} from '@nestjs/common';


@Component()
export class WorkerFbService {


    public async getActualNews(idChat: number){

    }

    public async getUrlGroups(userId: number, token: string): Promise<string[]> {
        return ;
    }
}