import puppeteer from "puppeteer";
import {Db, MongoClient} from "mongodb";
import {CATALOG_COLLECTION, CRAWLER_INDEX_CATEGORY_COLLECTION, DB_NAME} from "../constant";
import mongoose, {connect} from "mongoose";
import Catalog from "./model/Catalog";
let browser: any;
let page: any;

beforeAll(async() => {
    await mongoose.connect("mongodb://127.0.0.1/nontonyu");
    const result = await Catalog.findOne();
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
        // const searchTitle = await funcSearchTitle();
        await page.type('#topSearchText',"test");
    },50000);
});




