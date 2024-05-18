import {IsNotEmpty} from "class-validator";


export class SearchParam {
    @IsNotEmpty()
    tipe:String;
}


