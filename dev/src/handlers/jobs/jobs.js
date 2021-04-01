import db from "@config/db";
import JobModel from "@models/jobs/Jobs";
const createJob = async(data)=>{
    const {title,description,md,tags} = data;
    const isDb = await db().catch(err=>{
        console.log(err);
    })
    return new Promise((resolve,reject)=>{
        if(!isDb) reject("Database error! in connectnig!")
        const job = new JobModel({
            md,description,title,tags
        })

        job.save()
        .then(job=>{
            console.log("Saved: ",job)
            resolve(job._id);
        }).catch(err=>{
            console.log(err);
            reject("Got while saving..")
        })
    })
}   
const getJob=async (selection={},fields={title:1,description:1,tags:1})=>{
    const isDb = await db().catch(err=>{
        console.log(err);
    })
    return new Promise((resolve,reject)=>{
        if(!isDb) reject("Database error! in connectnig!")
        JobModel.find(selection,fields)
        .then(jobs=>{
            resolve(jobs);
        }).catch(err=>{
            console.log(err);
            reject("internal server error!")
        })
    })
}
module.exports = {
    getJob,createJob
}