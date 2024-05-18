import mongoose, {Schema} from 'mongoose';
import {ICrawlerIndexCategory} from "../model/interface/ICrawlerIndexCategory";


export const CrawlerIndexCategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{collection:"crawler_index_category"});

export const CrawlerIndexCategory = mongoose.model<ICrawlerIndexCategory>('CrawlerIndexCategory', CrawlerIndexCategorySchema);
