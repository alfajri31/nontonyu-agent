import mongoose, {Schema} from 'mongoose';
import {ICatalogAnime} from "../interface/ICatalogAnime";


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
    studios: { type: String, required: true },
    themes: { type: String, required: true },
    type: { type: String, required: true },
    score : { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    letterLock: { type: String, required: true },
    urlCatalog:{type:String,required:true},
    urlCatalogImage:{type:String,required:true},
    sysCatalogType : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SysCatalogType",
        required: true
    },
    sysCrawlerIndexCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "SysCatalogType",
        required: true
    }
},{collection:"catalog_anime"});

export const CatalogAnimeTv = mongoose.model('CatalogAnime', CatalogAnimeSchema);
