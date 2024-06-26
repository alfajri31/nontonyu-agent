import mongoose from "mongoose";
import {SysCatalogType} from "../schema/SysCatalogTypeSchema";
import {SysCrawlerIndex} from "../schema/SysCrawlerIndexSchema";
import {SysCrawlerIndexCategory} from "../schema/SysCrawlerIndexCategorySchema";
import {SysCatalogTypeSeed, SysCrawlerIndexCategorySeed, SysCrawlerIndexSeed} from "./seed/data";
import {CatalogAnimeTv} from "../schema/CatalogAnimeSchema";
import {SysCrawlerIndexHist} from "../schema/SysCrawlerIndexHistorySchema";

export default (async()=> {
    await mongoose.connect("mongodb://127.0.0.1/nontonyu");
    // await CatalogAnimeTv.createCollection();
    await SysCatalogType.createCollection().then(async (r) => {
        const data = await r.findOne();
        if (!data) {
           return await r.insertMany(SysCatalogTypeSeed);
        }
    }).then(async (result) => {
        await SysCrawlerIndex.createCollection().then(async (r) => {
            let data = await SysCrawlerIndex.findOne();
            if (!data) {
                const catalogType = await SysCatalogType.findOne();
                const category = await SysCrawlerIndexCategory.findOne();
                // @ts-ignore
                SysCrawlerIndexSeed['sysCatalogType'] = catalogType.get("_id");
                // @ts-ignore
                SysCrawlerIndexSeed['sysCrawlerIndexCategory'] = category.get("_id");
                await SysCrawlerIndex.insertMany(SysCrawlerIndexSeed);
            }
        });
    });
    await SysCrawlerIndexCategory.createCollection().then(async (r) => {
        const data = await r.findOne();
        if(!data) {
            await r.insertMany(SysCrawlerIndexCategorySeed);
        }
    });
    await SysCrawlerIndexCategory.createCollection();
    /**
     * test Relationship
     */
    let testRelationOneToMany = await SysCatalogType.find().populate("sysCrawlerIndexes");
    testRelationOneToMany.forEach(data => {
        if(data.$getPopulatedDocs().length>0) {
            console.log("one to many",data);
            console.log(data.$getPopulatedDocs())
        }
    });
    let testRelationManyToOne = await SysCrawlerIndex.findOne().populate("sysCatalogType");
    console.log("many to one",testRelationManyToOne);
    await SysCrawlerIndexHist.createCollection();
})();
