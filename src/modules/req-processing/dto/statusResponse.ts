export class StatusResponse {
    status: string;
    err?: string;
    data?: any;

    constructor(status: string, err?: string, data?: string) {
        this.status = status;
        this.err = err;
        this.data = data;
    }
}