import {EnumCatalogTypes} from "../../enum/EnumCatalogTypes";
import {EnumCategoryCrawl} from "../../enum/EnumCategoryCrawl";

export const CrawlerIndexCategorySeed :
    {
        name: string
    }[] = [
    {
        name: EnumCategoryCrawl.CATALOG
    }
];

export const CrawlerIndexSeed : {
    result: number;
    indexed: boolean;
    completed: boolean;
    letterLock: string;
    category: string;
    tipe: ""
}[] = [
    {
        indexed: false,
        result : 0,
        category:EnumCategoryCrawl.CATALOG,
        completed: false,
        letterLock : "a",
        tipe: ""
    }
];



export const CatalogTypeSeed : (
    {
        tipe: string
    }
    )[] = [
    {
        tipe: EnumCatalogTypes.ANIME
    },
   {
        tipe: EnumCatalogTypes.DRAKOR
    }
];

