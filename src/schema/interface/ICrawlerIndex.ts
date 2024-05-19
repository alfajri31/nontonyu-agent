import mongoose from "mongoose";

export interface ICrawlerIndex {
    indexed: boolean;
    result : 0;
    category:string;
    completed: boolean;
    letterLock : string;
    sysCatalogType: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    rangeCap: number;
}
