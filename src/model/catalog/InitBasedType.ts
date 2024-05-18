import {IsEnum, IsNotEmpty} from "class-validator";
import {CatalogTypeEnum} from "../../enum/CatalogTypeEnum";
export class InitBasedType {
    @IsNotEmpty()
    @IsEnum(CatalogTypeEnum)
    type:string;
}


