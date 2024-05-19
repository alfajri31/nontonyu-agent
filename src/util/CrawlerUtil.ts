import {page} from "../test/myanimelist/crawl.test";
import {split} from "lodash";
export async function getHref(selector:string):Promise<string[]> {
    const list = await page.$$eval("#topSearchResultList",
        (els: any[]) => els.map((e,index) => e.children)
    );
    let size = Object.keys(list[0]).length;
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
export async function getText(selector:string) :Promise<string>{
    let text : string;
    let textArray :string[]=[];
    try{
        const selectors = selector.split(",")
        for (const selector of selectors) {
            const element = await page.$(selector);
            // @ts-ignore
            text = await page.evaluate((el: { innerText: any; }) => el.innerText, element)
            textArray.push(text);
        }
    }catch (e){}
    // @ts-ignore
    return textArray.toString()
}

