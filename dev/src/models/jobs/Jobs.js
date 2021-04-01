const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title:String,
    description:String,
    tags:[String],
    md:String,
    expire_at:{
        type:Date,
        default:new Date()
    }
})
// expire_at
// https://stackoverflow.com/questions/30232081/mongoexception-index-with-name-code-already-exists-with-different-options
// https://stackoverflow.com/questions/38472125/delete-mongodb-document-at-specific-time

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema)
