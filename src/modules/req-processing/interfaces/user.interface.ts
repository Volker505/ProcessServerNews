import {SocNetSchema} from '../../../database/schems/soc-net.schema';
import {PreferencesSchema} from '../../../database/schems/preferences.schema';
import {SocNetInterface} from '../../oauth/interfaces/soc-net.interface';
import {PreferencesInterface} from './preferences.interface';
import {NewsForUserInterface} from './news-for-user.interface';


export interface UserInterface {
    readonly name: string;

    readonly idChatUser: string;

    readonly userInVk: SocNetInterface;

    readonly userInFb: SocNetInterface;

    readonly todayAction: string ;  //утро день вечер ночь

    readonly preferences: [PreferencesInterface];

    readonly allNews: [NewsForUserInterface];
}