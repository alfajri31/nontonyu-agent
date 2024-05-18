import {ObjectId} from "mongodb";
import {ICrawlerIndex} from "../../model/interface/mongoose/CrawlerIndex";

export const CrawlerIndexCategorySeed :
    {
        name: string
    }[] = [
    {
        name: "catalog"
    }
];

export const CrawlerIndexSeed : {
    result: number;
    indexed: boolean;
    completed: boolean;
    letterLock: string;
    category: string;
    type: ""
}[] = [
    {
        indexed: false,
        result : 0,
        category:"catalog",
        completed: false,
        letterLock : "a",
        type: ""
    }
];



export const CatalogTypeSeed : (
    {
        type: string
    }
    )[] = [
    {
        type: "Anime"
    },
   {
       type: "Korea"
    }
];

