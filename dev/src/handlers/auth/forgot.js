const { setCookie } = require('nookies');
export default async function forgot(req,res){
    return new Promise((resolve,reject)=>{
        try{
            setCookie({res},"ts","logout",{
                maxAge:0,
                httpOnly:true,
                path:"/",
                secure:process.env.NODE_ENV === "production"
            });
        }catch(e){
            console.log(e);
            reject(null);
        }
    });
}