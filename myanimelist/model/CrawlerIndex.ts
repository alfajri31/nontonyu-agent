import mongoose, { Schema, Document } from 'mongoose';
import {Int32} from "mongodb";

export interface ICrawlerIndex extends Document {
    indexed: boolean;
    result : 0;
    category:string;
    letterLock : string;
}

const CrawlerIndex: Schema = new Schema({
    indexed: { type: Boolean, required: true },
    result: {type: Number,required:true},
    category: {type:String,required:true},
    letterLock: {type:String,required:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{collection:"crawler_index"});

export default mongoose.model<ICrawlerIndex>('crawlerIndex', CrawlerIndex);
