import {ObjectId} from "mongodb";


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
        type: "Anime",
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

