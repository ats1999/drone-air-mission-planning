import db from "@config/db"
const articleModel = require("@models/article/Article");
/**
 * Get a single articles.
 * @param {MongoDB_ObjectId} id id of the document(article)
 * @param {Object} fields Fields to returned form the function.
 */
export default async function getArticle(id,fields={}){
    try{
        const isDb=await db();
    }catch(e){
        console.log(e);
        return res.status(500).send("Internal server error!")
    }
    return new Promise((resolve,reject)=>{
        articleModel.findById({_id:id},fields)
        .then(article=>{
            resolve(article);
        }).catch(err=>{
            console.log(err)
            reject("Got an error")
        })
    })
}