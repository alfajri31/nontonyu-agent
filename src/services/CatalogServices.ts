import {EnumCategoryCrawl} from "../enum/EnumCategoryCrawl";
import {DTOInitBasedType} from "../model/global/catalog/DTOInitBasedType";
import {validation} from "../util/ValidationUtil";
import {SysCrawlerIndex} from "../schema/SysCrawlerIndexSchema";
import {SysCrawlerIndexCategory} from "../schema/SysCrawlerIndexCategorySchema";
import {SysCatalogType} from "../schema/SysCatalogTypeSchema";
import {Model} from "mongoose";
import * as fs from "fs";
import {ICrawlerIndex} from "../interface/ICrawlerIndex";
import {SysCrawlerIndexHist} from "../schema/SysCrawlerIndexHistorySchema";
import {ICrawlerIndexHist} from "../interface/ICrawlerIndexHist";

export class CatalogServices {
    async searchService(initBasedType : DTOInitBasedType) : Promise<string> {
       await validation(initBasedType);
        const currentType = await SysCatalogType.findOne({tipe: initBasedType.type});
        if (currentType !== null) {
            const categoryCrawlerCategory = await SysCrawlerIndexCategory.findOne({name: EnumCategoryCrawl.CATALOG});
            const crawlerIndex = <ICrawlerIndex>{};
            if (categoryCrawlerCategory) {
                crawlerIndex.indexed = true;
                crawlerIndex.sysCrawlerIndexCategory = categoryCrawlerCategory?.get("_id");
                crawlerIndex.letterLock = String(await this.searchLockService());
                crawlerIndex.result = 0;
                crawlerIndex.sysCatalogType = Object(currentType.get("_id"));
                await SysCrawlerIndex.replaceOne({}, crawlerIndex);
            }
            return crawlerIndex.letterLock;
        }
        throw new Error("can't init the letter lock");
    }

    async searchLockService() {
        const searchCap = await SysCrawlerIndex.findOne();
        if(searchCap) {
            let rangeCap = searchCap.get("rangeCap");
            let currentLetterLength = String(searchCap.get("letterLock")).length;
            if(searchCap.get("letterLock")=="" || currentLetterLength != rangeCap) {
                let currentLock : string;
                currentLock = String(searchCap.get("letterLock")).replace(/[^\d,.]+/g,"a")
                for(let i=0;i < Number(searchCap.get("rangeCap"))-1;i++) {
                    currentLock = currentLock+"a";
                    searchCap.set("letterLock",currentLock);
                    await searchCap.replaceOne(searchCap);
                }
                return searchCap.get("letterLock");
            }
            else {
                return searchCap.get("letterLock");
            }
        }
        else {
            return "";
        }
    }

    async createCrawl(objects: Object[],model:Model<any>): Promise<any> {
        const fullProp = objects.filter(object => {
            const tmp :string[]=[];
            for (const key in object) {
                // @ts-ignore
                tmp.push(object[key])
            }
            return tmp.every(el => el!==''||null||undefined);
        });
        let jsonString = JSON.stringify(objects);
        let jsonPretty = JSON.stringify(JSON.parse(jsonString),null,2);
        fs.writeFile('src/logs/'+model.modelName+'.json', jsonPretty,  function(err) {
            if (err) {
                return console.error(err);
            }
        });

        return fullProp.length > 0 ?
            (async function () {
                for (const data of objects) {
                    // @ts-ignore
                    let letterLock = data["letterLock"]
                    await model.deleteOne({
                        letterLock : letterLock
                    })
                }
                 await model.create(fullProp)
                /**
                 * logic complete crawler and increase the letterLock
                 */
                const singleData = <ICrawlerIndex><unknown>fullProp[0]
                await letterLockCompleted(singleData);
            }())
            : (async function () {
                throw "ERROR: An object on every property must have a value," +
                "please adjust the selector and see the output object"
            }());

        async function letterLockCompleted(singleData: ICrawlerIndex) {
            let data : ICrawlerIndex
            const crawlerIndexHist = <ICrawlerIndexHist>{};
            let isIncreased: boolean;
            data = <ICrawlerIndex><unknown> await SysCrawlerIndex.findOne({
                sysCrawlerIndexCategory: singleData.sysCrawlerIndexCategory
            }).populate('sysCrawlerIndexCategory').populate('sysCatalogType');
            isIncreased = await increaseLetter(data.letterLock);
            if(isIncreased) {
                crawlerIndexHist.isCompleted=true;
                crawlerIndexHist.sysCrawlerIndexCategory = data.sysCrawlerIndexCategory._id;
                crawlerIndexHist.sysCrawlerIndex = data._id
                await SysCrawlerIndexHist.create(crawlerIndexHist);
            }
            else {
                throw new Error("crawler can't be completed")
            }
        }

        async function increaseLetter(letterLock: string) {
            const letters = ['a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'];
            return true;
        }
    }
}
