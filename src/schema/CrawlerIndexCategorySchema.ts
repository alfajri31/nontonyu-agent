import mongoose, {Schema} from 'mongoose';
import {ICrawlerIndexCategory} from "../model/global/interface/ICrawlerIndexCategory";


export const CrawlerIndexCategorySchema: Schema<ICrawlerIndexCategory> = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{collection:"crawler_index_category"});

export const CrawlerIndexCategory = mongoose.model('CrawlerIndexCategory', CrawlerIndexCategorySchema);
