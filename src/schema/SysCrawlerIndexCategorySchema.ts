import mongoose, {Schema} from 'mongoose';
import {ICrawlerIndexCategory} from "../interface/ICrawlerIndexCategory";


export const SysCrawlerIndexCategorySchema: Schema<ICrawlerIndexCategory> = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{collection:"sys_crawler_index_category"});

export const SysCrawlerIndexCategory = mongoose.model('SysCrawlerIndexCategory', SysCrawlerIndexCategorySchema);
