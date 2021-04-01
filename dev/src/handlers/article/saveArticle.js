import articleModel from "@models/article/Article";
import db from "@config/db";
/**
 * Save article to the database.
 * @param {HttpRequest} req request object containing information.
 * @param {HttpResponse} res responce object 
 */
async function saveArticle(req,res){
    try{
        const isDb = await db();
    }catch(e){
        console.log(e);
        return res.status(500).send("Internal server error.");
    }
    
    const {title,description,md,tags} = req.body;
    let article = new articleModel({
        title,description,md,tags,authorName:req.dev.fname,
        authorId:req.dev.id
    })
    article.save()
    .then(savedArticle=>{
        console.log("Here!")
        return res.status(200).send({articleId:savedArticle._id,authorId:req.dev.id});
    }).catch(err=>{
        console.log(err);
        return res.status(500).send("Can't published your article. Don't worry, this will be saved as draft.")
    })
}
export default saveArticle