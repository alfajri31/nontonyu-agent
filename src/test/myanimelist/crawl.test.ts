import puppeteer from "puppeteer";
import init from "../../db/init";
import {CatalogServices} from "../../services/CatalogServices";
import {EnumCatalogTypes} from "../../enum/EnumCatalogTypes";
import { ParamInitBasedType } from "../../model/global/catalog/ParamInitBasedType";
import {getHref, getText} from "../../util/CrawlerUtil";
import {CatalogAnimeTvSelector} from "../../selector/CatalogAnimeTvSelector";
import {CatalogAnimeTv} from "../../schema/CatalogAnimeSchemaTv";

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
    let initBasedType: ParamInitBasedType = new ParamInitBasedType();
    let catalogAnimeTvSelector: CatalogAnimeTvSelector = new CatalogAnimeTvSelector();
    let searchInitType: string;
    it('Init Based Type', async () => {
        initBasedType.type = EnumCatalogTypes.ANIME;
        searchInitType = await catalogService.searchService(initBasedType);
    });
    it('Open gate MyAnimeList', async () => {
        page = await browser.newPage();
        await page.goto("https://myanimelist.net");
    });
    it('How many anime that appear in list', async () => {
        await page.click('#topSearchText');
        await page.type('#topSearchText', searchInitType);
        await new Promise(r => setTimeout(r, 2000));
        await page.type('#topSearchText', " ");
        await new Promise(r => setTimeout(r, 2000));
        const href = await getHref('#topSearchResultList');
        for (const link of href) {
            await page.goto(link);
            const catalogAnimeTv = new CatalogAnimeTv();
            catalogAnimeTv.title = await getText(catalogAnimeTvSelector.title);
        }
    });
});




