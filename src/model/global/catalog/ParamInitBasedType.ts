import {IsEnum, IsNotEmpty} from "class-validator";
import {EnumCatalogTypesCollection} from "../../../enum/EnumCatalogTypes";


export class ParamInitBasedType {
    @IsNotEmpty()
    @IsEnum(EnumCatalogTypesCollection)
    type:string;
}


