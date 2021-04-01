const mongoose = require("mongoose");

const devSchema = new mongoose.Schema({
    entity:String
})

module.exports = mongoose.models.bdevg || mongoose.model('bdevg', devSchema)
