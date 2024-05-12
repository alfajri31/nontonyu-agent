import mongoose, { Schema, Document } from 'mongoose';
import {Collection} from "mongodb";

export interface ICatalog extends Document {
    "title": string
}

const CatalogSchema: Schema = new Schema({
    title: { type: String, required: true }
},{collection:"catalog"});

export default mongoose.model<ICatalog>('', CatalogSchema);
