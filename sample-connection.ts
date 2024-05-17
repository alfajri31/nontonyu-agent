import {Db, MongoClient} from "mongodb";

(async () => {
    const client: MongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
    const db: Db = client.db("nontonyu");
    await db.collection("catalog").findOne().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
})();


