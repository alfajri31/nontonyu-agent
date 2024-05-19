import puppeteer from "puppeteer";
import init from "../../db/init";
import {CatalogServices} from "../../services/CatalogServices";
import {EnumCatalogTypes} from "../../enum/EnumCatalogTypes";
import { DTOInitBasedType } from "../../model/global/catalog/DTOInitBasedType";
import {getHref, getInnerText} from "../../util/CrawlerUtil";
import {SelectorCatalogAnimeTv} from "../../selector/SelectorCatalogAnimeTv";
import {CatalogAnimeTv} from "../../schema/CatalogAnimeSchema";
import {EnumCategoryCrawl} from "../../enum/EnumCategoryCrawl";
import {SysCatalogType} from "../../schema/SysCatalogTypeSchema";
import {SysCrawlerIndexCategory} from "../../schema/SysCrawlerIndexCategorySchema";
import {DTOCatalogAnime} from "../../model/myanimelist/catalog/DTOCatalogAnime";

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
        let dtoCatalogAnimeList : DTOCatalogAnime[]=[];
        // let href="https://myanimelist.net/manga/3721/AAA?q=aa%20&cat=manga";
        for (const href of hrefs) {
            await page.goto(href);
            const dtoCatalogAnime = new DTOCatalogAnime();
            dtoCatalogAnime.title = await getInnerText(selectorCatalogAnimeTv.title);
            dtoCatalogAnime.type = await getInnerText(selectorCatalogAnimeTv.type);
            dtoCatalogAnime.studios = await getInnerText(selectorCatalogAnimeTv.studios);
            dtoCatalogAnime.aired = await getInnerText(selectorCatalogAnimeTv.aired);
            dtoCatalogAnime.broadcast = await getInnerText(selectorCatalogAnimeTv.broadcast);
            dtoCatalogAnime.duration = await getInnerText(selectorCatalogAnimeTv.duration);
            dtoCatalogAnime.episodes = await getInnerText(selectorCatalogAnimeTv.episodes);
            dtoCatalogAnime.genres = await getInnerText(selectorCatalogAnimeTv.genres,"genres");
            dtoCatalogAnime.licensors= await getInnerText(selectorCatalogAnimeTv.licensors);
            dtoCatalogAnime.premired = await getInnerText(selectorCatalogAnimeTv.premired);
            dtoCatalogAnime.producers = await getInnerText(selectorCatalogAnimeTv.producers);
            dtoCatalogAnime.synopsis = await getInnerText(selectorCatalogAnimeTv.synopsis);
            dtoCatalogAnime.themes = await getInnerText(selectorCatalogAnimeTv.themes);
            dtoCatalogAnime.score = await getInnerText(selectorCatalogAnimeTv.score);
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
        }
        await catalogService.createCrawl(dtoCatalogAnimeList,CatalogAnimeTv)
    });
});




