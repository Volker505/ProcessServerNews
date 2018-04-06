import {NewsSchema} from '../../../database/schems/news.schema';
import {NewsInterface} from './news.interface';


export class NewsForUserInterface {
    readonly userId: string; //todo возможет тип objectId

    readonly news: NewsInterface[];

    readonly relevant: boolean;  //акутальность новостей true-пользователь не видел новости
}