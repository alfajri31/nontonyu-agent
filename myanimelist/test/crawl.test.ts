import puppeteer from "puppeteer";
import mongoose, {connect, Schema} from "mongoose";
import Catalog, {ICatalog} from "../model/Catalog";
import CrawlerIndexCategory from "../model/CrawlerIndexCategory";
import CrawlerIndex, {ICrawlerIndex} from "../model/CrawlerIndex";
let browser: any;
let page: any;


async function funcSearchTitle() {
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
beforeAll(async() => {
    await mongoose.connect("mongodb://127.0.0.1/nontonyu");
    const test = await Catalog.findOne();
    browser = await puppeteer.launch({
        headless: true,
        args: [ '--ignore-certificate-errors','--no-sandbox'],
    })
});
afterAll(async () => {
    await browser.close()
});
describe('search anime', () => {
    it('open myanimelist', async() => {
        page = await browser.newPage();
        await page.goto("https://myanimelist.net");
    },50000);
    it('click search anime searchbar', async() => {
        await page.click('#topSearchText');
    },50000);
    it('type anime that you want', async() => {
        const searchTitle = await funcSearchTitle();
        await page.type('#topSearchText',searchTitle);
    },50000);
});




