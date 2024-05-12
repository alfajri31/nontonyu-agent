import CrawlerIndexCategory from "../model/CrawlerIndexCategory";
import CrawlerIndex, {ICrawlerIndex} from "../model/CrawlerIndex";

export async function funcSearchTitle() {
    const categoryCrawlerCategory = await CrawlerIndexCategory.findOne({name:"catalog"});
    if(categoryCrawlerCategory) {
        const crawlerIndex = <ICrawlerIndex>{}
        crawlerIndex.indexed=true;
        crawlerIndex.category =categoryCrawlerCategory.get("name");
        crawlerIndex.letterLock="a";
        crawlerIndex.result=0;
        await CrawlerIndex.create(crawlerIndex);
    }
    return null;
}
