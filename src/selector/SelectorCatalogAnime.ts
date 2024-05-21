
import {ObjectId} from "mongodb";
import {ICatalogAnime} from "../interface/ICatalogAnime";

export class SelectorCatalogAnime implements ICatalogAnime{

    letterLock: string;
    aired: string = "#content > table > tbody > tr > td.borderClass > div > div:nth-child(18)";
    broadcast: string = "#content > table > tbody > tr > td.borderClass > div > div:nth-child(20)";
    createdAt: Date;
    duration: string = "#content > table > tbody > tr > td.borderClass > div > div:nth-child(28)";
    episodes: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(18)";
    genres: string ="" +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(18)," +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(25)";
    licensors: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(22) > a";
    premired: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(19) > a";
    producers: string =
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(21) > a:nth-child(2)," +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(21) > a:nth-child(3)," +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(21) > a:nth-child(4)";
    score: string ="" +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(32) > span.score-label.score-6," +
        "#content > table > tbody > tr > td:nth-child(2) > div.rightside.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(1) > td > div.pb24 > div.di-t.w100.mt12 > div > div.stats-block.po-r.clearfix > div.fl-l.score > div," +
        "#content > table > tbody > tr > td:nth-child(2) > div.rightside.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(1) > td > div.pb16 > div.di-t.w100.mt12 > div.anime-detail-header-stats.di-tc.va-t > div.stats-block.po-r.clearfix > div.fl-l.score > div";
    studios: string ="#content > table > tbody > tr > td.borderClass > div > div:nth-child(23) > a";
    synopsis: string ="" +
        "#content > table > tbody > tr > td:nth-child(2) > div.rightside.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(1) > td > p," +
        "#content > table > tbody > tr > td:nth-child(2) > div.rightside.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(1) > td > span";
    themes: string ="" +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(26) > a," +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(19) > a";
    title: string='' +
        '#contentWrapper > div:nth-child(1) > div > div.h1-title > div > h1 > strong,' +
        '#contentWrapper > div:nth-child(1) > h1 > span > span';
    type: string="" +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(15) > a," +
        "#content > table > tbody > tr > td.borderClass > div > div:nth-child(13) > a";
    updatedAt: Date;
    sysCatalogType: ObjectId;
    sysCrawlerIndexCategory: ObjectId;
    urlCatalog:string;
    urlCatalogImage: string="#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img";

}
