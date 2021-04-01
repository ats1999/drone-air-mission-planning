import Dev from "@models/devs/Dev";
/**
 * Find a Dev and return it to the calller.
 * @param {Object} selection selection criteria for document..
 * @param {Object} updation what fileds needs to be updated.
 * @param {Object} options Any valid option as per mngoose documentation.
 */
async function updateDev(selection,updation,options={}){
    return new Promise((resolve,reject)=>{
        Dev.findOneAndUpdate(selection,updation,options)
        .then(dev=>{
            console.log(dev)
            resolve(dev)
        })
        .catch(err=>{
            console.log(err)
            reject(err)
        })
    })
}
export default updateDev;