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
    _id : ObjectId,
    result: number;
    indexed: boolean;
    completed: boolean;
    letterLock: string;
    category: string;
    sysCatalogType: ObjectId,
    sysCrawlerIndexCategory: ObjectId
}[] = [
    {
        _id: new ObjectId(),
        indexed: false,
        result : 0,
        category: "",
        completed: false,
        letterLock : "a",
        sysCatalogType: new ObjectId('664a0bb0f53d34c54b0e9658'),
        sysCrawlerIndexCategory : new ObjectId('664a0bb1f53d34c54b0e9660')
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

