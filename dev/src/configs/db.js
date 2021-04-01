const mongoose = require("mongoose");
/**
 * This is a utility function.
 * This function establishes a connection with database then returns a promise.
 */
export default function db(){
    return new Promise((resolve,reject)=>{
        //  process.env.MONGO_URI
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(res=>{
            if(res)
                resolve("Database connected!")
        }).catch(err=>{
            console.log(err)
            reject("DB_ERROR")
        })
    })
}
