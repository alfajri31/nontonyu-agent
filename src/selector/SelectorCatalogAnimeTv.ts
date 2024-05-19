import {ICatalogAnimeTv} from "../schema/interface/ICatalogAnimeTv";

export class SelectorCatalogAnimeTv implements ICatalogAnimeTv{

    letterLock: string;
    aired: string = "#content > table > tbody > tr > td.borderClass > div > div:nth-child(18) > span";
    broadcast: string = "#content > table > tbody > tr > td.borderClass > div > div:nth-child(20) > span";
    createdAt: Date;
    duration: string = "#content > table > tbody > tr > td.borderClass > div > div:nth-child(28)";
    episodes: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(16) > span";
    genres: string ="" +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(25) > a:nth-child(3)," +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(25) > a:nth-child(5)";
    licensors: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(22) > a";
    premired: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(19) > a";
    producers: string =
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(21) > a:nth-child(2)," +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(21) > a:nth-child(3)," +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(21) > a:nth-child(4)";
    rating: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(29) > span";
    score: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(32) > span.score-label.score-6";
    source: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(24) > span";
    studios: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(23) > a";
    synopsis: string ="#content > table > tbody > tr > td:nth-child(2) > div.rightside.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(1) > td > p";
    themes: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(26) > a";
    title: string='#contentWrapper > div:nth-child(1) > div > div.h1-title > div > h1 > strong';
    type: string="#content > table > tbody > tr > td.borderClass > div > div:nth-child(15) > a";
    updatedAt: Date;
    sysCatalogType: string;
    sysCrawlerIndexCategory: string;

}
