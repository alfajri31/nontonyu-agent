import mongoose, {Schema} from 'mongoose';
import {ICatalogType} from "./interface/ICatalogType";

export const SysCatalogTypeSchema: Schema<ICatalogType> = new Schema({
    tipe: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{
    collection:"sys_catalog_type"
});

SysCatalogTypeSchema.virtual("crawlerIndexes", {
    ref: "SysCrawlerIndex",
    localField: '_id',
    foreignField: 'tipe'
})

export const SysCatalogType = mongoose.model('SysCatalogType', SysCatalogTypeSchema);
