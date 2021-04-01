import db from "@config/db";
import Dev from "@models/devs/Dev";
/**
 * Get data about document(Dev).
 * @param {ObjectId} id id of the user/dev/document
 */
export default async function getUsersData(id){
    const dbConn = await db().catch(err=>{
        return null;
    });

    return new Promise((resolve,reject)=>{
        Dev.findById({_id:id})
        .then(dev=>{
            resolve(dev)
        }).catch(err=>{
            console.log(err);
            reject(null);
        })
    })
}