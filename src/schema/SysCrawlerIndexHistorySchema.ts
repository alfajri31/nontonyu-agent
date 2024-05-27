import mongoose, {Schema} from 'mongoose';
import {ICrawlerIndexHist} from "../interface/ICrawlerIndexHist";


export const SysCrawlerIndexHistSchema: Schema<ICrawlerIndexHist> = new Schema({
    sysCrawlerIndex: {type:mongoose.Schema.ObjectId,required:true},
    sysCrawlerIndexCategory : {type: mongoose.Schema.ObjectId,required:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isCompleted: {type:Boolean,default:false}
},{
    collection:"sys_crawler_index_history"
});

SysCrawlerIndexHistSchema.index({sysCrawlerIndex:1,sysCrawlerIndexCategory:1},{unique:true})

export const SysCrawlerIndexHist = mongoose.model('SysCrawlerIndexHist', SysCrawlerIndexHistSchema);
