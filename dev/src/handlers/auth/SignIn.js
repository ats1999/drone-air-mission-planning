import devModel from "@models/devs/Dev";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_KEY = process.env.JWT_KEY;
const { setCookie } = require('nookies');
import db from "@config/db";

/**
 * Sign in user and save it into databse and generate token.
 * @param {Object} req  Htpp request
 * @param {Object} res  Htpp response
 */
export default async function(req,res){
    try{
        const isDb = await db();
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal server error!");
    }
    
    const {email,password} = req.body;
    devModel.findOne({email:email})
    .then(dev=>{
        if(!dev) return res.status(404).send("Password or email do not matched!") 
        
        bcrypt.compare(password,dev.password,(err,isMatched)=>{
            if(err)
                return res.status(401).send("Password does not matched!");
            if(!isMatched)
                return res.status(422).send("Password or email do not matched!");

            const tokenDev = {
                fname:dev.fname,
                lname:dev.lname,
                id:dev._id,
                permissions:dev.permissions,
                pic:dev.pic,
                status:dev.status
            }

            jwt.sign(tokenDev,JWT_KEY,{expiresIn:"10d"},(err,token)=>{
                if(err){
                    console.log(err)
                    return res.status(500).send("Internal server error");
                }
                setCookie({res},"ts",token,{
                    maxAge:10 * 24 * 60 * 60,
                    httpOnly:true,
                    path:"/",
                    secure:process.env.NODE_ENV == "production"
                })

                return res.status(200).send(tokenDev);
            })
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).send("Internal server error!");
    })
}