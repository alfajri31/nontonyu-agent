import {IsNotEmpty} from "class-validator";

export class ParamCrawlSize {
    @IsNotEmpty()
    sizeList:number;
}
