import mongoose, {Document} from "mongoose";

export interface ICatalogType extends Document {
    tipe: string;
    createdAt: Date;
    updatedAt: Date;
    crawlerIndexes : [mongoose.Types.ObjectId]
}
