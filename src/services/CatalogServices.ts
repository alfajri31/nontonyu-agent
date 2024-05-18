import {ISearchParam} from "../model/interface/ISearchParam";
import CatalogType from "../model/interface/mongoose/CatalogType";
import CrawlerIndexCategory from "../model/interface/mongoose/CrawlerIndexCategory";
import CrawlerIndex, {ICrawlerIndex} from "../model/interface/mongoose/CrawlerIndex";


export class CatalogServices {

    async searchService(searchParam: ISearchParam) {
        const currentType = await CatalogType.findOne({type:searchParam.type});
        if(currentType!==null) {
            const categoryCrawlerCategory = await CrawlerIndexCategory.findOne({name: "catalog"});
            const crawlerIndex = <ICrawlerIndex>{};
            if (categoryCrawlerCategory) {
                crawlerIndex.indexed = true;
                crawlerIndex.category = categoryCrawlerCategory.get("name");
                crawlerIndex.letterLock = await this.searchLockService();
                crawlerIndex.result = 0;
                crawlerIndex.type = currentType.get("_id");
                await CrawlerIndex.replaceOne({},crawlerIndex);
            }
            const posts = await CrawlerIndex.findOne();
            const idType = posts?.get("type")._id;
            return crawlerIndex.letterLock;
        }
        return "";
    }

    async searchLockService() {
        const searchCap = await CrawlerIndex.findOne();
        if(searchCap) {
            let rangeCap = searchCap.get("rangeCap");
            let currentLetterLength = searchCap.get("letterLock").length;
            if(searchCap.get("letterLock")=="" || currentLetterLength != rangeCap) {
                let currentLock : string;
                currentLock = searchCap.get("letterLock").replace(/[^\d,.]+/g,"a")
                for(let i=0;i<searchCap.get("rangeCap")-1;i++) {
                    currentLock = currentLock+"a";
                    searchCap.set("letterLock",currentLock);
                    await searchCap.replaceOne(searchCap);
                }
                return searchCap.get("letterLock");
            }
            else {
                return searchCap.get("letterLock");
            }
        }
        else {
            return "";
        }

    }

    async isCompleted(searchParam: ISearchParam) {
        /**
         * Algorithm
         * Jika size list adalah 5 maka
         * Masukan data list anmime sebanyak 5 dengan go_into_page kemudian elemen yang relevan
         */
        return false;
    }
}
