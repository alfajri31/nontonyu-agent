import mongoose, { Schema, Document } from 'mongoose';

export interface ICrawlerIndexCategory extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const CrawlerIndexCategory: Schema = new Schema({
    name: { type: String, required: true }
},{collection:"crawler_index_category"});

export default mongoose.model<ICrawlerIndexCategory>('crawler_index_category', CrawlerIndexCategory);
