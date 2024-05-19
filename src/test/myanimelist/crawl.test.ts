import puppeteer from "puppeteer";
import init from "../../db/init";
import {CatalogServices} from "../../services/CatalogServices";
import {EnumCatalogTypes} from "../../enum/EnumCatalogTypes";
import { DTOInitBasedType } from "../../model/global/catalog/DTOInitBasedType";
import {getHref, getText} from "../../util/CrawlerUtil";
import {DTOCatalogAnimeTv} from "../../model/myanimelist/catalog/DTOCatalogAnimeTv";
import {SelectorCatalogAnimeTv} from "../../selector/SelectorCatalogAnimeTv";
import {CatalogAnimeTv} from "../../schema/CatalogAnimeSchemaTv";
import {EnumCategoryCrawl} from "../../enum/EnumCategoryCrawl";
import {SysCatalogType} from "../../schema/SysCatalogTypeSchema";
import {SysCrawlerIndex} from "../../schema/SysCrawlerIndexSchema";
import {SysCrawlerIndexCategory} from "../../schema/SysCrawlerIndexCategorySchema";

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
    let selectorCatalogAnimeTv: SelectorCatalogAnimeTv = new SelectorCatalogAnimeTv();
    let letterLock: string;
    it('Init Based Type', async () => {
        initBasedType.type = EnumCatalogTypes.ANIME;
        letterLock = await catalogService.searchService(initBasedType);
    });
    it('Open gate MyAnimeList', async () => {
        page = await browser.newPage();
        await page.goto("https://myanimelist.net");
    });
    it('How many anime that appear in list', async () => {
        await page.click('#topSearchText');
        await page.type('#topSearchText', letterLock);
        await new Promise(r => setTimeout(r, 2000));
        await page.type('#topSearchText'," ");
        await new Promise(r => setTimeout(r, 2000));
        const hrefs = await getHref('#topSearchResultList');
        let dtoCatalogAnimeTvList : DTOCatalogAnimeTv[]=[];
        for (const href of hrefs) {
            await page.goto(href);
            const dtoCatalogAnimeTv = new DTOCatalogAnimeTv();
            dtoCatalogAnimeTv.title = await getText(selectorCatalogAnimeTv.title);
            dtoCatalogAnimeTv.type = await getText(selectorCatalogAnimeTv.type);
            dtoCatalogAnimeTv.studios = await getText(selectorCatalogAnimeTv.studios);
            dtoCatalogAnimeTv.aired = await getText(selectorCatalogAnimeTv.aired);
            dtoCatalogAnimeTv.broadcast = await getText(selectorCatalogAnimeTv.broadcast);
            dtoCatalogAnimeTv.duration = await getText(selectorCatalogAnimeTv.duration);
            dtoCatalogAnimeTv.episodes = await getText(selectorCatalogAnimeTv.episodes);
            dtoCatalogAnimeTv.genres = await getText(selectorCatalogAnimeTv.genres);
            dtoCatalogAnimeTv.licensors= await getText(selectorCatalogAnimeTv.licensors);
            dtoCatalogAnimeTv.premired = await getText(selectorCatalogAnimeTv.premired);
            dtoCatalogAnimeTv.producers = await getText(selectorCatalogAnimeTv.producers);
            dtoCatalogAnimeTv.synopsis = await getText(selectorCatalogAnimeTv.synopsis);
            dtoCatalogAnimeTv.themes = await getText(selectorCatalogAnimeTv.themes);
            dtoCatalogAnimeTv.score = await getText(selectorCatalogAnimeTv.score);
            const sysCategoryType = await SysCatalogType.findOne({
                tipe : EnumCatalogTypes.ANIME
            })
            sysCategoryType? dtoCatalogAnimeTv.sysCatalogType = sysCategoryType.get("_id") :"";
            const sysCrawlerIndexCategory = await SysCrawlerIndexCategory.findOne({
                name : EnumCategoryCrawl.CATALOG
            })
            sysCrawlerIndexCategory? dtoCatalogAnimeTv.sysCrawlerIndexCategory=sysCrawlerIndexCategory.get("_id") :"";
            dtoCatalogAnimeTv.letterLock = letterLock;
            dtoCatalogAnimeTvList.push(dtoCatalogAnimeTv);
        }
        await catalogService.createCrawl(dtoCatalogAnimeTvList,CatalogAnimeTv)
    });
});




