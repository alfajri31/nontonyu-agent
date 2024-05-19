import {ObjectId} from "mongodb";

export interface ICatalogAnimeTv {
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
}
