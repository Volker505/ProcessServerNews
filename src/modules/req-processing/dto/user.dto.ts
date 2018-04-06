import {PreferencesSchema} from '../../../database/schems/preferences.schema';


export class UserDto {
    name: string;
    idChatUser: string;
    todayAction: string;    //утро, день ...
    userInVk: string;
    userInFb: string;
    preferences: string[];
}