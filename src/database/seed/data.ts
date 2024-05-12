import {ObjectId} from "mongodb";
import CatalogType from "../../model/CatalogType";


export const crawlerIndexCategorySeed = [
    {
        name: "catalog"
    }
];

export const crawlerIndexSeed = [
    {
        indexed: false,
        result : 0,
        category:"catalog",
        completed: false,
        letterLock : "a",
        type:{type:"Anime"}
    }
];

export const catalogTypeSeed = [
    {
        id: ObjectId,
        type: "Anime"
    },
   {
       id: ObjectId,
       type: "Korea"
    }
];

