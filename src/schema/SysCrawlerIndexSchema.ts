import mongoose, {Schema} from 'mongoose';
import {ICrawlerIndex} from "../interface/ICrawlerIndex";


export const SysCrawlerIndexSchema: Schema<ICrawlerIndex> = new Schema({
    _id :{type:mongoose.Schema.ObjectId,required:true},
    indexed: { type: Boolean, required: true },
    result: {type: Number,required:true},
    sysCrawlerIndexCategory: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "SysCrawlerIndexCategory",
        required:true
    },
    letterLock: {type:String,required:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    rangeCap: {type:Number,default:2},
    sysCatalogType: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"SysCatalogType",
        required: true
    },
    resetConfig: {type:Boolean,default:false}
},{
    collection:"sys_crawler_index_config"
});

export const SysCrawlerIndex = mongoose.model('SysCrawlerIndex', SysCrawlerIndexSchema);
