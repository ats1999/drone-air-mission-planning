import articleModel from "@models/article/Article";
/**
 * Update article to the database.
 * @param {Object} selection selection from the database
 * @param {Object} update required update
 */
async function updateArticle(selection,update){
    return new Promise((resolve,reject)=>{
        articleModel.findOneAndUpdate(selection,{$set:update})
        .then(savedArticle=>{
            resolve(savedArticle._id);
        }).catch(err=>{
            console.log(err);
            return reject(null);
        })
    })    
}
export default updateArticle