import {EnumCategoryCrawl} from "../enum/EnumCategoryCrawl";
import {ParamInitBasedType} from "../model/global/catalog/ParamInitBasedType";
import {ICrawlerIndex} from "../schema/interface/ICrawlerIndex";
import {ParamCatalogAnime} from "../model/myanimelist/catalog/ParamCatalogAnime";
import {validation} from "../util/ValidationUtil";
import {SysCrawlerIndex} from "../schema/SysCrawlerIndexSchema";
import {SysCrawlerIndexCategory} from "../schema/SysCrawlerIndexCategorySchema";
import {SysCatalogType} from "../schema/SysCatalogTypeSchema";

export class CatalogServices {
    async searchService(initBasedType : ParamInitBasedType) : Promise<string> {
       await validation(initBasedType);
        const currentType = await SysCatalogType.findOne({tipe: initBasedType.type});
        if (currentType !== null) {
            const categoryCrawlerCategory = await SysCrawlerIndexCategory.findOne({name: EnumCategoryCrawl.CATALOG});
            const crawlerIndex = <ICrawlerIndex>{};
            if (categoryCrawlerCategory) {
                crawlerIndex.indexed = true;
                crawlerIndex.category = String(categoryCrawlerCategory?.get("name"));
                crawlerIndex.letterLock = String(await this.searchLockService());
                crawlerIndex.result = 0;
                crawlerIndex.tipe = Object(currentType.get("_id"));
                await SysCrawlerIndex.replaceOne({}, crawlerIndex);
            }
            return crawlerIndex.letterLock;
        }
        throw new Error("can't init the letter lock");
    }

    async searchLockService() {
        const searchCap = await SysCrawlerIndex.findOne();
        if(searchCap) {
            let rangeCap = searchCap.get("rangeCap");
            let currentLetterLength = String(searchCap.get("letterLock")).length;
            if(searchCap.get("letterLock")=="" || currentLetterLength != rangeCap) {
                let currentLock : string;
                currentLock = String(searchCap.get("letterLock")).replace(/[^\d,.]+/g,"a")
                for(let i=0;i < Number(searchCap.get("rangeCap"))-1;i++) {
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

    async crawlCatalog(paramCatalogAnime: ParamCatalogAnime):Promise<boolean> {
        /**
         * Algorithm
         * Jika size list adalah 5 maka
         * Masukan data list anime sebanyak 5 dengan go_into_page kemudian cek elemen yang relevan lagi
         */
        await validation(paramCatalogAnime);
        return true;
    }
}
