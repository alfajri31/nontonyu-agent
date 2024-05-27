import mongoose from "mongoose";
import {ObjectId} from "mongodb";

export interface ICrawlerIndex {
    _id :ObjectId,
    indexed: boolean;
    result : 0;
    sysCrawlerIndexCategory:mongoose.Types.ObjectId;
    completed: boolean;
    letterLock : string;
    sysCatalogType: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    rangeCap: number;
}
