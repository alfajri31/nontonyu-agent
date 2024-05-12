import mongoose, { Schema, Document } from 'mongoose';

export interface ICatalogAnime extends Document {
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
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{collection:"catalog_anime"});

export default mongoose.model<ICatalogAnime>('catalogAnime', CatalogSchema);
