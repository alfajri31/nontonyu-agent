import mongoose from "mongoose";

export interface ICrawlerIndex {
    indexed: boolean;
    result : 0;
    category:string;
    completed: boolean;
    letterLock : string;
    tipe: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    rangeCap: number;
}
