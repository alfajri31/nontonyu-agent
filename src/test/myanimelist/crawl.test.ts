import puppeteer from "puppeteer";
import {isCompleted, searchService} from "../../services/services";
import conn from "../../db/conn";
import {ISearchParam} from "../../model/interface/ISearchParam";

let browser: any;
let page: any;

beforeAll(async() => {
    await conn;
    browser = await puppeteer.launch({
        headless: true,
        slowMo:30,
        args: [ '--ignore-certificate-errors','--no-sandbox'],
    })
});
afterAll(async () => {
    await browser.close()
});
describe('search anime', () => {
    it('Open Myanimelist', async() => {
        page = await browser.newPage();
        await page.goto("https://myanimelist.net");
    },50000);
    it('Click search anime searchbar', async() => {
        await page.click('#topSearchText');
    },50000);
    it('Type anime that you want', async() => {
        const searchParam = <ISearchParam>{};
        const searchTitle = await searchService(searchParam);
        await page.type('#topSearchText',searchTitle);
        await page.click('#myanimelist > div.wrapper > div.top_signup.ga-impression');
        await page.type('#topSearchText',searchTitle);
    },50000);
    it('How many anime that appear', async() => {
        const parent = await page.$$eval(
            "#topSearchResultList",
            (els: any[]) => els.map(e => e.children)
        );
        let size = Object.keys(parent[0]).length;
        const searchParam = <ISearchParam>{};
        const searchTitle = await isCompleted(searchParam);
    },50000);
});




