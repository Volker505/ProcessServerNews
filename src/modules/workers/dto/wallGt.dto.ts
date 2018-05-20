
export class WallGtDto {
    items: RecordGt[];
}

export class RecordGt {
    creator: string;
    title: string;
    link: string;
    pubDate: string;
    content: string;    //это xml (текст и ссылки, теги итд)

    contentSnippet:string;

    isoDate: string; //дата время 2вар
    categories: any[];

    img: string;
}