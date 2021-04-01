import db from "@config/db";
import Dev from "@models/devs/Dev";

// create a new user if it dosent exist
async function create(options){
    let isDb,user; 
    try{
        isDb = await db();
        user = await Dev.findOne({email:options.email})
    }catch(err){
        console.log(err);
    }
    return new Promise((res,rej)=>{
        if(!isDb) rej("Db not connected");
        if(user) return res(user);
        const newDev = new Dev(options);
        newDev.save()
        .then(saved=>{
            res(saved)
        })
        .catch(err=>{
            console.log(err)
            rej(err)
        });
    })
}
export default create;