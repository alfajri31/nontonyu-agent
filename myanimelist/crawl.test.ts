import puppeteer from "puppeteer";
import {Collection, FindCursor, MongoClient, ObjectId, WithId} from "mongodb";
let browser: any;
let page: any;

function funcSearchTitle() {
    return;
}

async function test() {
    const collections: { catalog?: Collection } = {}
    const client: MongoClient = new MongoClient("mongodb://localhost:27017/");
    const myDb = client.db("nontonyu");
    const catalog: Collection = myDb.collection("catalog");
    let result = await catalog.findOne({
        title : "test"
    })
    console.log(`Successfully connected to database: ${myDb.databaseName} 
        and collection: ${catalog.collectionName}`);

}


beforeAll(async() => {
    await test();

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
        // page = await browser.newPage();
        // await page.goto("https://myanimelist.net");
    },50000);
    // it('click search anime searchbar', async() => {
    //     await page.click('#topSearchText');
    // },50000);
    // it('type anime that you want', async() => {
    //     const searchTitle = funcSearchTitle();
    //     await page.type('#topSearchText',"test");
    // },50000);
});




