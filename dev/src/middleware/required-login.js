import { parseCookies } from 'nookies';
import jwt from "jsonwebtoken";
const JWT_KEY = process.env.JWT_KEY;

const requiredLogin = (handler) => (req,res)=>{
    const token = parseCookies({req}).ts;
    jwt.verify(token,JWT_KEY,(err,dev)=>{
        if(err) console.log(err);

        if(err) return res.status(401).send("Login first!");
        req.dev=dev;
        return handler(req,res);
    })
}

module.exports = requiredLogin;