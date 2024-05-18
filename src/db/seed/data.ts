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
    tipe: ""
}[] = [
    {
        indexed: false,
        result : 0,
        category:"catalog",
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
        tipe: "Anime"
    },
   {
       tipe: "Korea"
    }
];

