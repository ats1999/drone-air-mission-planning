import db from "@config/db";
const articleModel = require("@models/article/Article");

/**
 * Get articles data.
 * @param {Object} selection selection criteria  of document.
 * @param {Object} fields Fields that are needs to be returned form the document.
 */
export default async function articlesData(selection={},fields={}){
    const isDb=await db().catch(err=>{
        console.log(err)
        return null;
    });
    return new Promise((resolve,reject)=>{
        articleModel.find(selection,fields)
        .then(articles=>{
            resolve(articles);
        }).catch(err=>{
            console.log(err)
            reject("Got an error")
        })
    })
}