import {IsNotEmpty} from "class-validator";

export class CrawlBasedSize {
    @IsNotEmpty()
    sizeList:number;
}
