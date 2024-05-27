import {ObjectId} from "mongodb";


export interface ICrawlerIndexHist {
    sysCrawlerIndex: ObjectId
    sysCrawlerIndexCategory: ObjectId;
    isCompleted : boolean
    createdAt: Date;
    updatedAt: Date;
}
