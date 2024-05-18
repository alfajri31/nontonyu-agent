import mongoose, {Schema} from 'mongoose';
import {ICrawlerIndex} from "./interface/ICrawlerIndex";


export const SysCrawlerIndexSchema: Schema<ICrawlerIndex> = new Schema({
    indexed: { type: Boolean, required: true },
    result: {type: Number,required:true},
    category: {type:String,required:true},
    letterLock: {type:String,required:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    rangeCap: {type:Number,default:2},
    tipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"SysCatalogType"
    },
    completed: {type:Boolean,default:false}
},{
    collection:"sys_crawler_index"
});

export const SysCrawlerIndex = mongoose.model('SysCrawlerIndex', SysCrawlerIndexSchema);
