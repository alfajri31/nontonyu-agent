import puppeteer from "puppeteer";
import mongoose, {connect, Schema} from "mongoose";
import Catalog from "../../model/Catalog";
import {isCompleted, searchService} from "../../services/services";
let browser: any;
let page: any;

beforeAll(async() => {
    await mongoose.connect("mongodb://127.0.0.1/nontonyu");
    await Catalog.findOne();
    browser = await puppeteer.launch({
        headless: true,
        slowMo:30,
        args: [ '--ignore-certificate-errors','--no-sandbox'],
    })
});
afterAll(async () => {
    await browser.close()
    process.exit();
});
describe('search anime', () => {
    it('Open myanimelist', async() => {
        page = await browser.newPage();
        await page.goto("https://myanimelist.net");
    },50000);
    it('Click search anime searchbar', async() => {
        await page.click('#topSearchText');
    },50000);
    it('Type anime that you want', async() => {
        const searchTitle = await searchService();
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
        const searchTitle = await isCompleted(size);
    },50000);
});




