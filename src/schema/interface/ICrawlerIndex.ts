import mongoose from "mongoose";

export interface ICrawlerIndex {
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
