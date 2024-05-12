import puppeteer from "puppeteer";
import {Collection, Db, FindCursor, MongoClient, ObjectId, WithId} from "mongodb";
let browser: any;
let page: any;
let db : Db;

const client: MongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
db = client.db("nontonyu");
db.collection("catalog").findOne().then(test => {
    console.log(test);
}).catch(err => {
    console.log(err);
});

async function funcSearchTitle() {
    const catalog = await db.collection("crawler_index_category")
        .find({ name: "catalog" }).next().then(result => {
        return result;
    });
    if(catalog) {

    }
}

beforeAll(async() => {
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
        const searchTitle = await funcSearchTitle();
        await page.type('#topSearchText',"test");
    },50000);
});




