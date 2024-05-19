import {EnumCategoryCrawl} from "../enum/EnumCategoryCrawl";
import {DTOInitBasedType} from "../model/global/catalog/DTOInitBasedType";
import {ICrawlerIndex} from "../schema/interface/ICrawlerIndex";
import {validation} from "../util/ValidationUtil";
import {SysCrawlerIndex} from "../schema/SysCrawlerIndexSchema";
import {SysCrawlerIndexCategory} from "../schema/SysCrawlerIndexCategorySchema";
import {SysCatalogType} from "../schema/SysCatalogTypeSchema";
import {Model} from "mongoose";
import * as fs from "fs";

export class CatalogServices {
    async searchService(initBasedType : DTOInitBasedType) : Promise<string> {
       await validation(initBasedType);
        const currentType = await SysCatalogType.findOne({tipe: initBasedType.type});
        if (currentType !== null) {
            const categoryCrawlerCategory = await SysCrawlerIndexCategory.findOne({name: EnumCategoryCrawl.CATALOG});
            const crawlerIndex = <ICrawlerIndex>{};
            if (categoryCrawlerCategory) {
                crawlerIndex.indexed = true;
                crawlerIndex.category = String(categoryCrawlerCategory?.get("name"));
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
            return tmp.every(el => el!=''||null||undefined);
        });
        let jsonString = JSON.stringify(objects);
        let jsonPretty = JSON.stringify(JSON.parse(jsonString),null,2);
        fs.writeFile('src/logs/'+model.modelName+'.json', jsonPretty,  function(err) {
            if (err) {
                return console.error(err);
            }
        });
        for (const data of objects) {
            // @ts-ignore
            let letterLock = data["letterLock"]
            await model.deleteOne({
                letterLock : letterLock
            })
        }
        return fullProp.length > 0 ?
            (async function () {
                await model.create(fullProp)
            }())
            : (function(){
                throw "ERROR: An object on every property must have a value," +
            "please adjust the selector and see the output object"
            }());
    }
}
