import {PreferencesSchema} from '../../../database/schems/preferences.schema';


export class UserDto {
    name: string;
    idChatUser: string;
    todayAction: string;    //утро, день ...
    userIdVk: string;
    userIdFb: string;
    preferences: string[];
}