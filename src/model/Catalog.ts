import mongoose, { Schema, Document } from 'mongoose';

export interface ICatalog extends Document {
    title: string;
    aired: string;
    broadcast : string;
    duration:string;
    episodes: string;
    genres: string;
    licensors: string;
    premired: string;
    producers: string;
    rating: string;
    source: string;
    studios: string;
    themes: string;
    type: string;
}

const CatalogSchema: Schema = new Schema({
    title: { type: String, required: true }
},{collection:"catalog"});

export default mongoose.model<ICatalog>('catalog', CatalogSchema);
