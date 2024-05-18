import mongoose, {Schema} from 'mongoose';
import {ICatalogType} from "../model/interface/ICatalogType";


export const CatalogTypeSchema: Schema<ICatalogType> = new Schema({
    tipe: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    crawlerIndexes : [{
        type: mongoose.Schema.Types.ObjectId,ref:"CrawlerIndex"
    }]
},{
    collection:"catalog_type"
});

export const CatalogType = mongoose.model('CatalogType', CatalogTypeSchema);
