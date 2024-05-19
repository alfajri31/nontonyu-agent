import {EnumCatalogTypes} from "../../enum/EnumCatalogTypes";
import {EnumCategoryCrawl} from "../../enum/EnumCategoryCrawl";

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
        category:EnumCategoryCrawl.CATALOG,
        completed: false,
        letterLock : "a",
        sysCatalogType: ""
    }
];



export const SysCatalogTypeSeed : (
    {
        sysCatalogType: string
    }
    )[] = [
    {
        sysCatalogType: EnumCatalogTypes.ANIME
    },
   {
        sysCatalogType: EnumCatalogTypes.DRAKOR
    }
];

