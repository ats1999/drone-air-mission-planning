const fs = require('fs');
const path = require("path");
export async function getArticleInfo(){
    return new Promise((resolve,reject)=>{
        fs.readFile(path.resolve(__dirname,"./Article.json"),(err,data)=>{
            if(err) reject(err);
            resolve(data);
        })
    })
}

