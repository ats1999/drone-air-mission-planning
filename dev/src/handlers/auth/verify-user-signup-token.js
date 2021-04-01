const JWT_USER_VERIFICATION_KEY = process.env.JWT_USER_VERIFICATION_KEY;
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
import db from "@config/db";
import devModel from "@models/devs/Dev";
const { setCookie } = require('nookies');
/**
 * This function will verify user token when he receives a verification link.
 * @param {Object} req - a Http request object 
 * @param {object} res - a Http response object 
 * @return (Number) Status - Http status
 */

export default async function verifyUserSignupToken(req,res){
    try{
        const isDb = await db();
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal server error!");
    }

    const {ts,email,password} = req.body;
    jwt.verify(ts,JWT_USER_VERIFICATION_KEY,(err,data)=>{
        if(err) {
            // 401 indecating bad authentication details
            return res.status(401).send("This link has been expired!");
        } else
        if(data.email!==email || data.plainPassword!==password){
            console.log(`${data.email}==${email} ^ ${data.plainPassword}==${password}`)
            return res.status(422).send("Password or email do not matched with the previous ones.");
        }
        
        const newDev = new devModel({
            fname:data.fname,
            lname:data.lname,
            email:data.email,
            password:data.password
        })
        newDev.save()
        .then(savedDev=>{
            const tokenDev = {
                fname:savedDev.fname,
                lname:savedDev.lname,
                id:savedDev._id,
                permissions:savedDev.permissions,
                pic:savedDev.pic
            }

            jwt.sign(tokenDev,JWT_KEY,{expiresIn:"10d"},(err,token)=>{
                if(err){
                    console.log(err)
                    return res.status(500).send("Try again!")
                }
                setCookie({res},"ts",token,{
                    maxAge:10 * 24 * 60 * 60,
                    httpOnly:true,
                    path:"/",
                    secure:process.env.NODE_ENV == "production"
                })
                return res.status(200).send(tokenDev)
            })
        })
        .catch(err=>{
            console.log(err);
            return res.status(500).send("Try again!")
        })
    })
}