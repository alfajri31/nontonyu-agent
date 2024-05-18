import {Document} from "mongoose";

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
    createdAt: Date;
    updatedAt: Date;
}
