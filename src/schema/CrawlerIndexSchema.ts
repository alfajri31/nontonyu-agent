import mongoose, {Schema} from 'mongoose';
import {ICrawlerIndex} from "../model/interface/ICrawlerIndex";


export const CrawlerIndexSchema: Schema<ICrawlerIndex> = new Schema({
    indexed: { type: Boolean, required: true },
    result: {type: Number,required:true},
    category: {type:String,required:true},
    letterLock: {type:String,required:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    rangeCap: {type:Number,default:2},
    tipe: { type: mongoose.Schema.Types.ObjectId,ref:"CatalogType"},
    completed: {type:Boolean,default:false}
},{
    collection:"crawler_index"
});

export const CrawlerIndex = mongoose.model('CrawlerIndex', CrawlerIndexSchema);
