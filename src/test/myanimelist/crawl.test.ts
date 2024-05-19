import puppeteer from "puppeteer";
import init from "../../db/init";
import {CatalogServices} from "../../services/CatalogServices";
import {EnumCatalogTypes} from "../../enum/EnumCatalogTypes";
import { ParamInitBasedType } from "../../model/global/catalog/ParamInitBasedType";
import {getHref, getText} from "../../util/CrawlerUtil";
import {SelectorCatalogAnimeTv} from "../../selector/SelectorCatalogAnimeTv";
import {ICatalogAnimeTv} from "../../schema/interface/ICatalogAnimeTv";

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
        const href = await getHref('#topSearchResultList');
        let catalogAnimeTvList : ICatalogAnimeTv[]=[];
        for (const link of href) {
            await page.goto(link);
            const catalogAnimeTv = <ICatalogAnimeTv>{};
            catalogAnimeTv.title = await getText(selectorCatalogAnimeTv.title);
            catalogAnimeTv.type = await getText(selectorCatalogAnimeTv.type);
            catalogAnimeTv.studios = await getText(selectorCatalogAnimeTv.studios);
            catalogAnimeTv.aired = await getText(selectorCatalogAnimeTv.aired);
            catalogAnimeTv.broadcast = await getText(selectorCatalogAnimeTv.broadcast);
            catalogAnimeTv.duration = await getText(selectorCatalogAnimeTv.duration);
            catalogAnimeTv.episodes = await getText(selectorCatalogAnimeTv.episodes);
            catalogAnimeTv.genres = await getText(selectorCatalogAnimeTv.genres);
            catalogAnimeTv.licensors= await getText(selectorCatalogAnimeTv.licensors);
            catalogAnimeTv.premired = await getText(selectorCatalogAnimeTv.premired);
            catalogAnimeTv.producers = await getText(selectorCatalogAnimeTv.producers);
            catalogAnimeTv.synopsis = await getText(selectorCatalogAnimeTv.synopsis);
            catalogAnimeTv.rating = await getText(selectorCatalogAnimeTv.rating);
            catalogAnimeTv.source = await getText(selectorCatalogAnimeTv.source);
            catalogAnimeTv.themes = await getText(selectorCatalogAnimeTv.themes);
            catalogAnimeTv.score = await getText(selectorCatalogAnimeTv.score);
            catalogAnimeTv.letterLock = letterLock;
            catalogAnimeTvList.push(catalogAnimeTv);
        }
        await catalogService.crawlCatalog(catalogAnimeTvList)
    });
});




