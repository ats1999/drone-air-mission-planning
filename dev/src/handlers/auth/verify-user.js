const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const saltRounds = 10;
import {sendMail} from "@utils/send-mail";
const HOST = process.env.HOST;
const JWT_USER_VERIFICATION_KEY = process.env.JWT_USER_VERIFICATION_KEY;
/**
 * When user request to signup on the server,
 * this function will take user data and create a JWT token.
 * Then it sends the token to the client within email for verification.
 * 
 * @param {Object} user user data which includes first name, last name, email and password of the user. 
 * @return {Object} new Promise it contains status of the email
 */
export function sendVerificationLink({fname,lname,email,password}){
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(saltRounds)
        .then(salt=>{
            bcrypt.hash(password,salt)
            .then(hash=>{
                const newUser = {
                    fname:fname, 
                    lname:lname,
                    email:email,
                    password:hash,
                    plainPassword:password
                }

                // create JWT Token
                jwt.sign(newUser,JWT_USER_VERIFICATION_KEY,{expiresIn: 60 * 60 },(err,token)=>{
                    let text = `<h1>Welcome ${fname} to the bdevg(Developer Space).</h1>`;
                    text += "Below is the link to verify your account.<br>";
                    text += "This link will be valid for 10 minutes. <br>";

                    // js is the user
                    // ts is the token
                    text += `Link -> <a href="${HOST}/auth?auth=verify&js=${token+token}&ts=${token}">Verify</a> <br>`;
                    text += `If you are not able to verify using the link then copy paste the link directly in the browsers tab. <br>`;
                    text += HOST+"/auth?auth=verify&js="+token+token+"&ts="+token;
                    
                    // send mail also returns a promise which will be resolved finally
                    err?reject({
                        msg:"Can't create token",
                        file:"src/handlers/auth/verify-user.js",
                        err:err
                        }):resolve(sendMail({
                        from:"rahul@bdevg.com",
                        to:email,
                        subject:"Verify account",
                        html:text
                    }));
                })
            })//bcrypt.hash().then()
            .catch(err=>reject({
                msg:"Can't hash password in bcrypt.hash().catch()",
                file:"src/handlers/auth/verify-user.js",
                err:err
            }))
        }) // genSalt().then()
        .catch(err=>{
            reject({
                msg:"Can't generate salt in genSalt().catch()",
                file:"src/handlers/auth/verify-user.js",
                err:err
            });
        })// genSalt().catch()
    })
}
