import mongoose, {Schema} from 'mongoose';
import {ICatalogAnime} from "./interface/ICatalogAnime";


export const CatalogAnimeSchema: Schema<ICatalogAnime> = new Schema({
    synopsis: {type: String,required:true},
    title: { type: String, required: true },
    aired: {type:String,required:true},
    broadcast : { type: String, required: true },
    duration:{ type: String, required: true },
    episodes: { type: String, required: true },
    genres: { type: String, required: true },
    licensors:{ type: String, required: true },
    premired:{ type: String, required: true },
    producers: { type: String, required: true },
    rating: { type: String, required: true },
    source: { type: String, required: true },
    studios: { type: String, required: true },
    themes: { type: String, required: true },
    type: { type: String, required: true },
    score : { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{collection:"catalog_anime"});

export const CatalogAnime = mongoose.model('CatalogAnime', CatalogAnimeSchema);
