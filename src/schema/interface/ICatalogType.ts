import mongoose from "mongoose";

export interface ICatalogType {
    tipe: string;
    createdAt: Date;
    updatedAt: Date;
    crawlerIndexes : [mongoose.Types.ObjectId]
}
