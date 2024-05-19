import {IsEnum, IsNotEmpty} from "class-validator";
import {EnumCatalogTypesCollection} from "../../../enum/EnumCatalogTypes";


export class DTOInitBasedType {
    @IsNotEmpty()
    @IsEnum(EnumCatalogTypesCollection)
    type:string;
}


