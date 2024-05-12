import mongoose, { Schema, Document } from 'mongoose';
import {Int32} from "mongodb";
import {ICatalogAnime} from "./CatalogAnime";

export interface ICrawlerIndex extends Document {
    indexed: boolean;
    result : 0;
    category:string;
    completed: boolean;
    letterLock : string;
    type: string;
}

const CrawlerIndex: Schema = new Schema({
    indexed: { type: Boolean, required: true },
    result: {type: Number,required:true},
    category: {type:String,required:true},
    letterLock: {type:String,required:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    rangeCap: {type:Number,default:2},
    type: {type:String,default:"Anime"},
    completed: {type:Boolean,default:false}
},{collection:"crawler_index"});

export default mongoose.model<ICrawlerIndex>('crawlerIndex', CrawlerIndex);
