import mongoose from "mongoose";
import {
    CatalogTypeSeed, CrawlerIndexCategorySeed,
    CrawlerIndexSeed,
} from "./seed/data";
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
           return await r.insertMany(CatalogTypeSeed);
        }
    }).then(async (result) => {
        await CrawlerIndex.createCollection().then(async (r) => {
            let data = await CrawlerIndex.findOne();
            if (!data) {
                CrawlerIndexSeed.forEach(seed => {
                    // @ts-ignore
                    seed.type = result['0'];
                });
                await CrawlerIndex.insertMany(CrawlerIndexSeed);
            }
        });
    });
    await CrawlerIndexCategory.createCollection().then(async (r) => {
        const data = await r.findOne();
        if(!data) {
            await r.insertMany(CrawlerIndexCategorySeed);
        }
    });
})();
