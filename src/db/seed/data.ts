import {EnumCatalogTypes} from "../../enum/EnumCatalogTypes";
import {EnumCategoryCrawl} from "../../enum/EnumCategoryCrawl";
import {ObjectId} from "mongodb";

export const SysCrawlerIndexCategorySeed :
    {
        name: string
    }[] = [
    {
        name: EnumCategoryCrawl.CATALOG
    }
];

export const SysCrawlerIndexSeed : {
    result: number;
    indexed: boolean;
    completed: boolean;
    letterLock: string;
    category: string;
    sysCatalogType: ""
}[] = [
    {
        indexed: false,
        result : 0,
        category: "",
        completed: false,
        letterLock : "a",
        sysCatalogType: ""
    }
];



export const SysCatalogTypeSeed : (
    {
        tipe: string
    }
    )[] = [
    {
        tipe: EnumCatalogTypes.ANIME
    },
   {
        tipe: EnumCatalogTypes.DRAKOR
    },
    {
        tipe: EnumCatalogTypes.VIRAL
    }
];

