import mongoose from "mongoose";
import {catalogTypeSeed, crawlerIndexCategorySeed, crawlerIndexSeed} from "./seed/data";
import CatalogAnime from "../model/interface/mongoose/CatalogAnime";
import CatalogType from "../model/interface/mongoose/CatalogType";
import CrawlerIndex from "../model/interface/mongoose/CrawlerIndex";
import CrawlerIndexCategory from "../model/interface/mongoose/CrawlerIndexCategory";


export default (async()=> {
    await mongoose.connect("mongodb://127.0.0.1/nontonyu");
    await CatalogAnime.createCollection();
    await CatalogType.createCollection().then(async (r) => {
        const data = await r.findOne();
        if (!data) {
            await r.insertMany(catalogTypeSeed);
        }
    });
    await CrawlerIndex.createCollection().then(async (r) => {
        const data = await CrawlerIndex.findOne();
        if(!data) {
            await CrawlerIndex.insertMany(crawlerIndexSeed);
        }
    });

    await CrawlerIndexCategory.createCollection().then(async (r) => {
        const data = await r.findOne();
        if(!data) {
            await r.insertMany(crawlerIndexCategorySeed);
        }
    });
})();
