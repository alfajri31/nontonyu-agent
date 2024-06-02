import puppeteer from "puppeteer";
import init from "../../db/init";
import {CatalogServices} from "../../services/CatalogServices";
import {EnumCatalogTypes} from "../../enum/EnumCatalogTypes";
import {DTOInitBasedType} from "../../model/global/catalog/DTOInitBasedType";
import {getHref, getInnerText, getSrc} from "../../util/CrawlerUtil";
import {SelectorCatalogAnime} from "../../selector/SelectorCatalogAnime";
import {EnumCategoryCrawl} from "../../enum/EnumCategoryCrawl";
import {SysCatalogType} from "../../schema/SysCatalogTypeSchema";
import {SysCrawlerIndexCategory} from "../../schema/SysCrawlerIndexCategorySchema";
import {DTOCatalogAnime} from "../../model/myanimelist/catalog/DTOCatalogAnime";
import mongoose from "mongoose";

let browser: any;
export let page: any;

beforeAll(async() => {
    await init;
    browser = await puppeteer.launch({
        headless: true,
        slowMo:50,
        args: [ '--ignore-certificate-errors','--no-sandbox'],
    })
});
afterAll(async () => {
    await browser.close()
    try{process.exit()}catch (e) {}
});
describe('search anime',  () => {
    let catalogService: CatalogServices = new CatalogServices();
    let initBasedType: DTOInitBasedType = new DTOInitBasedType();
    let selectorCatalogAnime: SelectorCatalogAnime = new SelectorCatalogAnime();
    let letterLock: string;
    it('Init Based Type', async () => {
        initBasedType.type = EnumCatalogTypes.ANIME;
        letterLock = await catalogService.searchService(initBasedType);
    },120000);
    it('Open gate MyAnimeList', async () => {
        page = await browser.newPage();
        await page.goto("https://myanimelist.net",{timeout:60000});
    },120000);
    it('How many anime that appear in list', async () => {
        await page.click('#topSearchText');
        await page.type('#topSearchText', letterLock);
        await new Promise(r => setTimeout(r, 2000));
        await page.type('#topSearchText'," ");
        await new Promise(r => setTimeout(r, 2000));
        const hrefs = await getHref('#topSearchResultList');
        let dtoCatalogAnimeList : DTOCatalogAnime[]=[];
        // let href="https://myanimelist.net/anime/50/Aa_Megami-sama_TV?q=aa%20&cat=anime";
        for (const href of hrefs) {
            await page.goto(href,{timeout:120000});
            const dtoCatalogAnime = new DTOCatalogAnime();
            dtoCatalogAnime.title = await getInnerText(selectorCatalogAnime.title);
            dtoCatalogAnime.type = await getInnerText(selectorCatalogAnime.type);
            dtoCatalogAnime.studios = await getInnerText(selectorCatalogAnime.studios);
            dtoCatalogAnime.aired = await getInnerText(selectorCatalogAnime.aired);
            dtoCatalogAnime.broadcast = await getInnerText(selectorCatalogAnime.broadcast);
            dtoCatalogAnime.duration = await getInnerText(selectorCatalogAnime.duration);
            dtoCatalogAnime.episodes = await getInnerText(selectorCatalogAnime.episodes);
            dtoCatalogAnime.genres = await getInnerText(selectorCatalogAnime.genres,"genres");
            dtoCatalogAnime.licensors= await getInnerText(selectorCatalogAnime.licensors);
            dtoCatalogAnime.premired = await getInnerText(selectorCatalogAnime.premired);
            dtoCatalogAnime.producers = await getInnerText(selectorCatalogAnime.producers);
            // dtoCatalogAnime.synopsis = await getInnerText(selectorCatalogAnime.synopsis);
            dtoCatalogAnime.themes = await getInnerText(selectorCatalogAnime.themes);
            dtoCatalogAnime.score = await getInnerText(selectorCatalogAnime.score);
            dtoCatalogAnime.urlCatalogImage = await getSrc(selectorCatalogAnime.urlCatalogImage);
            dtoCatalogAnime.urlCatalog = href;
            const sysCategoryType = await SysCatalogType.findOne({
                tipe : EnumCatalogTypes.ANIME
            })
            sysCategoryType? dtoCatalogAnime.sysCatalogType = sysCategoryType.get("_id") :"";
            const sysCrawlerIndexCategory = await SysCrawlerIndexCategory.findOne({
                name : EnumCategoryCrawl.CATALOG
            })
            sysCrawlerIndexCategory? dtoCatalogAnime.sysCrawlerIndexCategory=sysCrawlerIndexCategory.get("_id") :"";
            dtoCatalogAnime.letterLock = letterLock;
            dtoCatalogAnimeList.push(dtoCatalogAnime);
            break;
        }
        const eventSchema = new mongoose.Schema({
            synopsis: {type: String,required:true},
            title: { type: String, required: true },
            aired: {type:String,required:true},
            broadcast : { type: String, required: true },
            duration:{ type: String, required: true },
            episodes: { type: String, required: true },
            genres: { type: String, required: true },
            licensors:{ type: String, required: true },
            premired:{ type: String, required: true },
            producers: { type: String, required: true },
            studios: { type: String, required: true },
            themes: { type: String, required: true },
            type: { type: String, required: true },
            score : { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
            letterLock: { type: String, required: true },
            urlCatalog:{type:String,required:true},
            urlCatalogImage:{type:String,required:true},
            sysCatalogType : {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SysCatalogType",
                required: true
            },
            sysCrawlerIndexCategory: {
                type: mongoose.Schema.Types.ObjectId,
                ref : "SysCatalogType",
                required: true
            }
        },{collection:"catalog_anime"});
        const Event = mongoose.model('Event', eventSchema);
        await catalogService.createCrawl(dtoCatalogAnimeList,Event);
    },1800000); //30 minutes
});




