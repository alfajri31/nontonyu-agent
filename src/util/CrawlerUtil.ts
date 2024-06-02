import {page} from "../test/myanimelist/crawl.test";

export async function getHref(selector:string):Promise<string[]> {
    const list = await page.$$eval(selector,
        (els: any[]) => els.map((e,index) => e.children)
    );
    let size = Object.keys(list[0]).length;
    const hrefs: string[] | PromiseLike<string[]> = [];
    for(let i=0;i<=size-1;i++) {
        const handle = await page.$(selector+' > div:nth-child('+i+') a');
        try {
            // @ts-ignore
            hrefs.push(await page.evaluate((els:{
            getAttribute: (arg0: string) => any;
        }) => els.getAttribute('href'), handle));}catch(e){}
    }
    return hrefs;
}
export async function getInnerText(selector:string,containText?:string|undefined) :Promise<string>{
    let text : string;
    let textArray :string[]=[];
    const selectors = selector.split(",")
    for (const selector of selectors) {
        try{
            const element = await page.$(selector);
            // @ts-ignore
            text = await page.evaluate((el: { innerText: any; }) => el.innerText, element)
            textArray.push(text);
        }catch (e){}
    }
    if(containText) {
        const regexExp = new RegExp(containText,'i');
        textArray = textArray.filter((data => data.match(regexExp)));
    }
    // @ts-ignore
    return textArray.toString()
}

export async function getSrc(selector:string,containText?:string|undefined) :Promise<string>{
    let text : string;
    let textArray :string[]=[];
    const selectors = selector.split(",")
    for (const selector of selectors) {
        try{
            const element = await page.$(selector);
            // @ts-ignore
            text = await page.evaluate((el: { src: any; }) => el.src, element)
            textArray.push(text);
        }catch (e){}
    }
    if(containText) {
        const regexExp = new RegExp(containText,'i');
        textArray = textArray.filter((data => data.match(regexExp)));
    }
    // @ts-ignore
    return textArray.toString()
}

export async function replaceEmptyStringObject(objects : Object[]) {
    for (const object of objects) {
        for(let key in object) {
            // @ts-ignore
            if(object[key]=="") {
                // @ts-ignore
                object[key]="n/a"
            }
        }
    }
}

