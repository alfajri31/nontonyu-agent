import {IsEnum, IsNotEmpty} from "class-validator";
import {EnumCatalogTypesCollection} from "../../../enum/EnumCatalogTypes";


export class InitBasedType {
    @IsNotEmpty()
    @IsEnum(EnumCatalogTypesCollection)
    type:string;
}


