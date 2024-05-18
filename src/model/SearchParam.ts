export class SearchParam {
    constructor(public tipe: string) {}
    set start(value: string) {
        this.tipe = value;
    }
    get start() : string {
        return this.tipe;
    }

}
