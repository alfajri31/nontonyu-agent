import CrawlerIndexCategory from "../model/CrawlerIndexCategory";
import CrawlerIndex, {ICrawlerIndex} from "../model/CrawlerIndex";

const alphabetical = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v'
    ,'w','x','y','z']

export async function searchService() {
    const categoryCrawlerCategory = await CrawlerIndexCategory.findOne({name:"catalog"});
    if(categoryCrawlerCategory) {
        const object = await searchLockService();
        // const crawlerIndex = <ICrawlerIndex>{}
        // crawlerIndex.indexed=true;
        // crawlerIndex.category =categoryCrawlerCategory.get("name");
        // crawlerIndex.letterLock="a";
        // crawlerIndex.result=0;
        // await CrawlerIndex.create(crawlerIndex);
    }
    return null;
}

export async function searchLockService() {
    const searchCap = await CrawlerIndex.findOne();

    if(searchCap) {
        let rangeCap = searchCap.get("rangeCap");
        let currentLetterLength = searchCap.get("letterLock").length;
        if(searchCap.get("letterLock")=="" || currentLetterLength != rangeCap) {
            let currentLock : string;
            searchCap.get("letterLock").replace(/[^\d,.]+/g,"a")
            for(let i=0;i<searchCap.get("rangeCap")-1;i++) {
                currentLock = searchCap.get("letterLock");
                currentLock = currentLock+"a";
                searchCap.set("letterLock",currentLock);
                await searchCap.replaceOne(searchCap);
            }
        }
        else {

        }
    }
    return searchCap;
}
