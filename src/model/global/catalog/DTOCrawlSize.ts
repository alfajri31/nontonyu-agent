import {IsNotEmpty} from "class-validator";

export class DTOCrawlSize {
    @IsNotEmpty()
    sizeList:number;
}
