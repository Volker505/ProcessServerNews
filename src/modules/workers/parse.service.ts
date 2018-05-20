import {Component} from '@nestjs/common';

export class Content {
    text: string;
    img: string[];
}

@Component()
export class ParseService {

    public parseXmlContent(content: string): Content{
        const result = new Content();
        result.text = content.replace(/<.*?>/g, ' ').replace(/^\s+/, '');
        result.img = content.match(/<img.>/g);

        return result;
    }
}