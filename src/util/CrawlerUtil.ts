import {Page} from "puppeteer";
import {ParamCatalogAnime} from "../model/myanimelist/catalog/ParamCatalogAnime";

export async function getHref(page : Page,selector:string):Promise<string[]> {
    const parent = await page.$$eval("#topSearchResultList",
        (els: any[]) => els.map((e,index) => e.children)
    );
    let size = Object.keys(parent[0]).length;
    const hrefs: string[] | PromiseLike<string[]> = [];
    for(let i=0;i<=size-1;i++) {
        const handle = await page.$('#topSearchResultList > div:nth-child('+i+') a');
        try {
            // @ts-ignore
            hrefs.push(await page.evaluate((els:{
            getAttribute: (arg0: string) => any;
        }) => els.getAttribute('href'), handle));}catch(e){}
    }
    return hrefs;
}

