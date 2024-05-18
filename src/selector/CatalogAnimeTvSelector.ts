import {ICatalogAnimeTv} from "../schema/interface/ICatalogAnimeTv";

export class CatalogAnimeTvSelector implements ICatalogAnimeTv{
    aired: string = "";
    broadcast: string = "";
    createdAt: Date;
    duration: string = "";
    episodes: string ="";
    genres: string ="";
    licensors: string ="";
    premired: string ="";
    producers: string ="";
    rating: string ="";
    score: string ="";
    source: string ="";
    studios: string ="";
    synopsis: string ="";
    themes: string ="";
    title: string="#contentWrapper > div:nth-child(1) > div > div.h1-title > div > h1 > strong";
    type: string="";
    updatedAt: Date;

}
