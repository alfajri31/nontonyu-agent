import puppeteer from "puppeteer";
import conn from "../../db/conn";;
import {CatalogServices} from "../../services/CatalogServices";
import {EnumCatalogTypes} from "../../enum/EnumCatalogTypes";
import { ParamInitBasedType } from "../../model/global/catalog/ParamInitBasedType";
import {ParamCatalogAnime} from "../../model/myanimelist/catalog/ParamCatalogAnime";

;

let browser: any;
let page: any;

beforeAll(async() => {
    await conn;
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
describe('search anime', () => {
    let catalogService : CatalogServices;
    let initBasedType : ParamInitBasedType;
    let searchInitType: string;
    beforeAll(async() => {
        initBasedType = new ParamInitBasedType();
        catalogService = new CatalogServices();
    })
    it('Init Based Type', async() => {
        initBasedType.type=EnumCatalogTypes.ANIME;
        searchInitType = await catalogService.searchService(initBasedType);
    },50000);
    it('Open gate MyAnimeList', async() => {
        page = await browser.newPage();
        await page.goto("https://myanimelist.net");
    },50000);
    it('How many anime that appear in list', async() => {
        await page.click('#topSearchText');
        await page.type('#topSearchText',searchInitType);
        await new Promise(r => setTimeout(r, 2000));
        await page.type('#topSearchText'," ");
        await new Promise(r => setTimeout(r, 2000));
        const parent = await page.$$eval("#topSearchResultList",
            (els: any[]) => els.map((e,index) => e.children)
        );
        let size = Object.keys(parent[0]).length;
        const hrefs = [];
        for(let i=0;i<=size-1;i++) {
            const handle = await page.$('#topSearchResultList > div:nth-child('+i+') > div > a');
            try {hrefs.push(await page.evaluate((els:{
                getAttribute: (arg0: string) => any;
            }) => els.getAttribute('href'), handle));}catch(e){}
            const paramCatalogAnime = new ParamCatalogAnime();
        }
    },50000);
});




