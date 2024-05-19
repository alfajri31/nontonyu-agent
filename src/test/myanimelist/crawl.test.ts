import puppeteer from "puppeteer";
import init from "../../db/init";
import {CatalogServices} from "../../services/CatalogServices";
import {EnumCatalogTypes} from "../../enum/EnumCatalogTypes";
import { DTOInitBasedType } from "../../model/global/catalog/DTOInitBasedType";
import {getHref, getInnerText} from "../../util/CrawlerUtil";
import {DTOCatalogAnimeTv} from "../../model/myanimelist/catalog/DTOCatalogAnimeTv";
import {SelectorCatalogAnimeTv} from "../../selector/SelectorCatalogAnimeTv";
import {CatalogAnimeTv} from "../../schema/CatalogAnimeSchemaTv";
import {EnumCategoryCrawl} from "../../enum/EnumCategoryCrawl";
import {SysCatalogType} from "../../schema/SysCatalogTypeSchema";
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
        let href="";
        for (const href of hrefs) {
            await page.goto(href);
            const dtoCatalogAnimeTv = new DTOCatalogAnimeTv();
            dtoCatalogAnimeTv.title = await getInnerText(selectorCatalogAnimeTv.title);
            dtoCatalogAnimeTv.type = await getInnerText(selectorCatalogAnimeTv.type);
            dtoCatalogAnimeTv.studios = await getInnerText(selectorCatalogAnimeTv.studios);
            dtoCatalogAnimeTv.aired = await getInnerText(selectorCatalogAnimeTv.aired);
            dtoCatalogAnimeTv.broadcast = await getInnerText(selectorCatalogAnimeTv.broadcast);
            dtoCatalogAnimeTv.duration = await getInnerText(selectorCatalogAnimeTv.duration);
            dtoCatalogAnimeTv.episodes = await getInnerText(selectorCatalogAnimeTv.episodes);
            dtoCatalogAnimeTv.genres = await getInnerText(selectorCatalogAnimeTv.genres,"genres");
            dtoCatalogAnimeTv.licensors= await getInnerText(selectorCatalogAnimeTv.licensors);
            dtoCatalogAnimeTv.premired = await getInnerText(selectorCatalogAnimeTv.premired);
            dtoCatalogAnimeTv.producers = await getInnerText(selectorCatalogAnimeTv.producers);
            dtoCatalogAnimeTv.synopsis = await getInnerText(selectorCatalogAnimeTv.synopsis);
            dtoCatalogAnimeTv.themes = await getInnerText(selectorCatalogAnimeTv.themes);
            dtoCatalogAnimeTv.score = await getInnerText(selectorCatalogAnimeTv.score);
            dtoCatalogAnimeTv.urlCatalog = href;
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




