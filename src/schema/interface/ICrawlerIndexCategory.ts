import {Document} from "mongoose";

export interface ICrawlerIndexCategory extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
