import {Component} from '@nestjs/common';
import {Attachment, WallElement} from './dto/wallVk.dto';

@Component()
export class AnalysisVkRecordService {

    public setTypeVkRecord(record: WallElement) {
        if (!record.attachments) {
            return;
        }

        const attachments = record.attachments[0];

        if (record.text.length > 120) {
            record ['type'] = 'article';
            return;
        }

        switch (attachments.type) {
            case 'photo':
                record ['type'] = 'photo';
                break;
            case 'doc':
                if (attachments.doc.ext == 'gif'){
                    record ['type'] = 'gif';
                }
                break;
            case 'video':
                record['type'] = 'video';
                break;
            case 'link':
                record['type'] = 'link';
                break
        }
    }

}