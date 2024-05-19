import {ICatalogAnimeTv} from "../../../schema/interface/ICatalogAnimeTv";
import {IsNotEmpty} from "class-validator";
import {ObjectId} from "mongodb";

export class DTOCatalogAnimeTv implements ICatalogAnimeTv{
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
    studios: string;
    @IsNotEmpty()
    themes: string;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    type: string;
    @IsNotEmpty()
    updatedAt: Date;
    @IsNotEmpty()
    score: string;
    @IsNotEmpty()
    letterLock: string;
    @IsNotEmpty()
    sysCatalogType: ObjectId;
    @IsNotEmpty()
    sysCrawlerIndexCategory: ObjectId;
}
