import db from "@config/db";
const articleModel = require("@models/article/Article");
/**
 * Delete an article.
 * @param {Object} selection selection creteria for the articles needs to be deleted.
 */
export default async function deleteArticle(selection){
    const isDb=await db().catch(err=>{
        console.log(err)
        return null;
    });
    return new Promise((resolve,reject)=>{
        articleModel.deleteOne(selection)
        .then(articles=>{
            resolve(articles);
        }).catch(err=>{
            console.log(err)
            reject("Got an error")
        })
    })
}