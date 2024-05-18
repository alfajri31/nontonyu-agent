import {ICatalogAnimeTv} from "../schema/interface/ICatalogAnimeTv";

export class CatalogAnimeTvSelector implements ICatalogAnimeTv{
    aired: string = "#content > table > tbody > tr > td.borderClass > div > div:nth-child(18) > span";
    broadcast: string = "#content > table > tbody > tr > td.borderClass > div > div:nth-child(20) > span";
    createdAt: Date;
    duration: string = "#content > table > tbody > tr > td.borderClass > div > div:nth-child(28)";
    episodes: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(16) > span";
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
    type: string="#content > table > tbody > tr > td.borderClass > div > div:nth-child(15) > a";
    updatedAt: Date;

}
