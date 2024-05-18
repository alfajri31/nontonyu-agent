import mongoose, {Schema} from 'mongoose';
import {ICatalogType} from "../model/interface/ICatalogType";

export const CatalogTypeSchema: Schema<ICatalogType> = new Schema({
    tipe: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{
    collection:"catalog_type"
});

CatalogTypeSchema.virtual("crawlerIndexes", {
    ref: "CrawlerIndex",
    localField: '_id',
    foreignField: 'tipe'
})

export const CatalogType = mongoose.model('CatalogType', CatalogTypeSchema);
