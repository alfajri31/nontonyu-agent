import {IsNotEmpty} from "class-validator";
import {Inject} from "../../decorator/Decorator";


export class SearchParam {
    @IsNotEmpty()
    tipe:String;
}


