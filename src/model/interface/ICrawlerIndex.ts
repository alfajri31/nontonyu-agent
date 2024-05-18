import mongoose, {Document} from "mongoose";

export interface ICrawlerIndex extends Document {
    indexed: boolean;
    result : 0;
    category:string;
    completed: boolean;
    letterLock : string;
    tipe: mongoose.Types.ObjectId;
}
