import CrawlerIndexCategory from "../model/CrawlerIndexCategory";
import CrawlerIndex, {ICrawlerIndex} from "../model/CrawlerIndex";
import crawlerIndex from "../model/CrawlerIndex";
import CatalogType from "../model/CatalogType";
import mongoose from "mongoose";

const alphabetical =
    ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v'
    ,'w','x','y','z']

export async function searchService(type:string) {
    const currentType = await CatalogType.findOne({type:type});
    if(currentType!==null) {
        const categoryCrawlerCategory = await CrawlerIndexCategory.findOne({name: "catalog"});
        const crawlerIndex = <ICrawlerIndex>{};
        if (categoryCrawlerCategory) {
            crawlerIndex.indexed = true;
            crawlerIndex.category = categoryCrawlerCategory.get("name");
            crawlerIndex.letterLock = await searchLockService();
            crawlerIndex.result = 0;
            await CrawlerIndex.create(crawlerIndex);
        }
        return crawlerIndex.letterLock;
    }
    return "";
}

export async function searchLockService() {
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

export async function isCompleted(size:number) {
    return false;
}
