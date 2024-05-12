import mongoose, { Schema, Document } from 'mongoose';
import {ICatalogAnime} from "./CatalogAnime";

export interface ICrawlerIndexCategory extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const CrawlerIndexCategory: Schema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{collection:"crawler_index_category"});

export default mongoose.model<ICrawlerIndexCategory>('crawlerIndexCategory', CrawlerIndexCategory);
