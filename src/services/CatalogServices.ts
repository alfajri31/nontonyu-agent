import {validate} from "class-validator";
import {CatalogType} from "../schema/CatalogTypeSchema";
import {CrawlerIndexCategory} from "../schema/CrawlerIndexCategorySchema";
import {EnumCategoryCrawl} from "../enum/EnumCategoryCrawl";
import {InitBasedType} from "../model/global/catalog/InitBasedType";
import {ICrawlerIndex} from "../model/global/interface/ICrawlerIndex";
import {CrawlerIndex} from "../schema/CrawlerIndexSchema";
import {ObjectId} from "mongodb";

export class CatalogServices {
    async searchService(initBasedType : InitBasedType) {
        await validate(initBasedType).then(errors =>
        {if(errors.length>0) {throw new Error(errors.toString());}});
        const currentType = await CatalogType.findOne({tipe: initBasedType.type});
        if (currentType !== null) {
            const categoryCrawlerCategory = await CrawlerIndexCategory.findOne({name: EnumCategoryCrawl.CATALOG});
            const crawlerIndex = <ICrawlerIndex>{};
            if (categoryCrawlerCategory) {
                crawlerIndex.indexed = true;
                crawlerIndex.category = String(categoryCrawlerCategory?.get("name"));
                crawlerIndex.letterLock = await this.searchLockService();
                crawlerIndex.result = 0;
                crawlerIndex.tipe = Object(currentType.get("_id"));
                await CrawlerIndex.replaceOne({}, crawlerIndex);
            }
            return crawlerIndex.letterLock;
        }
        return true;
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

    async isCompleted() {
        /**
         * Algorithm
         * Jika size list adalah 5 maka
         * Masukan data list anime sebanyak 5 dengan go_into_page kemudian cek elemen yang relevan lagi
         */
        return false;
    }
}
