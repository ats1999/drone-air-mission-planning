const mongoose = require("mongoose");

const devSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    permissions:{
        type:[String],
        default:["dev"]
    },
    pic:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:"A developer with great mind."
    },
    status:{
        type:String,
        default:" A dev..O_o"
    },
    socialMedia:{
        github:{
            type:String,
            default:""
        },
        codechef:{
            type:String,
            default:""
        },
        codeforces:{
            type:String,
            default:""
        },
        facebook:{
            type:String,
            default:""
        },
        linkedin:{
            type:String,
            default:""
        },
        twitter:{
            type:String,
            default:""
        },
        hackerrank:{
            type:String,
            default:""
        },
        website:{
            type:String,
            default:""
        }
    }
})

module.exports = mongoose.models.Dev || mongoose.model('Dev', devSchema)
