export class WallVkDto {
    count: number;
    items: WallElement[];

}

export class WallElement {
    id: number;
    owner_id: number;
    from_id: number;
    created_by: number;
    date: number;
    text: string;
    reply_owner_id: number;
    reply_post_id: number;

    //инфа для рекомендации
    comments: { count: number };
    likes: { count: number, user_likes: number };
    reposts: { count: number, user_reposted: number };
    views: { count: number };
    ////

    post_type: string; // может принимать следующие значения: post, copy, reply, postpone, suggest
    attachments: Attachment[];

    is_pinned: number;//информация о том, что запись закреплена.
    marked_as_ads: number;//содержит ли запись отметку "реклама"
}


export class Attachment {
    type: string;

    photo?: { id: number, text: string, date: number, photo_130: string, photo_604: string };
    video?: { id: number, title: string, date: number, description: string, photo_320: string, player: string };
    link?: { url: string, title: string, caption?: string, photo: {id: number, photo_604: string}};
    doc?: { id: number, ext: string, url: string, date: number, type: number }; //type 3-gif 4 — изображения; 6 — видео;
    note?: {id: number, title: string, text: string, date: number, view_url: string};//view_url-URL страницы для отображения заметки.

}