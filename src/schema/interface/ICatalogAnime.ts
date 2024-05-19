import {ObjectId} from "mongodb";

export interface ICatalogAnime {
    type: string;
    title: string;
    synopsis : string;
    aired: string;
    broadcast : string;
    duration:string;
    episodes: string;
    genres: string;
    licensors: string;
    premired: string;
    producers: string;
    studios: string;
    themes: string;
    score: string;
    createdAt: Date;
    updatedAt: Date;
    letterLock :string;
    sysCrawlerIndexCategory: ObjectId;
    sysCatalogType: ObjectId;
    urlCatalog:string;
    urlCatalogImage:string;
}
