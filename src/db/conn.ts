import mongoose from "mongoose";
import {
    CatalogTypeSeed, CrawlerIndexCategorySeed,
    CrawlerIndexSeed,
} from "./seed/data";
import {CatalogAnime} from "../schema/CatalogAnimeSchema";
import {CatalogType} from "../schema/CatalogTypeSchema";
import {CrawlerIndex} from "../schema/CrawlerIndexSchema";
import {CrawlerIndexCategory} from "../schema/CrawlerIndexCategorySchema";


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
                    seed.tipe = result['0'];
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
