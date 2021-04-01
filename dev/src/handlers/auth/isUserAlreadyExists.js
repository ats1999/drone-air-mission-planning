import db from "@config/db";
import devModel from "@models/devs/Dev";
import {userAlreadyExists,userDoesNotExists} from "@constants/server";
/**
 * Check if a user already exists or not.
 * @param {String} email email of the user
 */
export default async function isUserAlreadyExists(email){
    try{
        const idDb = await db();
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal server error!");
    }
    return new Promise((resolve,reject)=>{
        devModel.findOne({email:email})
        .then(dev=>{
            if(dev)
                resolve(userAlreadyExists)
            else
                resolve(userDoesNotExists)
        }).catch(err=>{
            reject(err)
        })
    })
}