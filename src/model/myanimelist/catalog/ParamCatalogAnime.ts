import {ICatalogAnime} from "../../../schema/interface/ICatalogAnime";
import {IsNotEmpty} from "class-validator";

export class ParamCatalogAnime implements ICatalogAnime{
    @IsNotEmpty()
    synopsis: string;
    @IsNotEmpty()
    aired: string;
    @IsNotEmpty()
    broadcast: string;
    @IsNotEmpty()
    createdAt: Date;
    @IsNotEmpty()
    duration: string;
    @IsNotEmpty()
    episodes: string;
    @IsNotEmpty()
    genres: string;
    @IsNotEmpty()
    licensors: string;
    @IsNotEmpty()
    premired: string;
    @IsNotEmpty()
    producers: string;
    @IsNotEmpty()
    rating: string;
    @IsNotEmpty()
    source: string;
    @IsNotEmpty()
    studios: string;
    @IsNotEmpty()
    themes: string;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    type: string;
    @IsNotEmpty()
    updatedAt: Date;
}
