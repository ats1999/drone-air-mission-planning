const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const articleSchema = new mongoose.Schema({
    title:String,
    description:String,
    md:String,
    views:{
        type:Number,
        default:0
    },
    upvote:{
        type:Number,
        default:0
    },
    downvote:{
        type:Number,
        default:0
    },
    tags:[String],
    upvotes:[ObjectId],
    downvotes:[ObjectId],
    comments:{
        type:[{
            commentor:{
                id:ObjectId,
                name:String
            },
            body:String
        }]
    },
    authorId:ObjectId,
    authorName:String
})
module.exports = mongoose.models ? mongoose.models.Article || mongoose.model('Article', articleSchema):mongoose.model('Article', articleSchema)
