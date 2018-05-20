import {Component} from '@nestjs/common';

export class Content {
    text: string;
    img: string;
}

@Component()
export class ParseService {

    public parseXmlContent(content: string): Content{
        const result = new Content();
        result.text = content.replace(/<.*?>/g, ' ').replace(/^\s+/, '');
        const img = content.match(/<img.*?src=".*?"/g);
        result.img = img ? img[0].match(/h.*?\.(png|bmp|jpg|jpeg|gif)/)[0]: null;
        return result;
    }
}