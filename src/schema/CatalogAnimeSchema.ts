import mongoose, { Schema} from 'mongoose';
import {ICatalogAnime} from "../model/interface/ICatalogAnime";


export const CatalogAnimeSchema: Schema<ICatalogAnime> = new Schema({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{collection:"catalog_anime"});

export const CatalogAnime = mongoose.model('CatalogAnime', CatalogAnimeSchema);
