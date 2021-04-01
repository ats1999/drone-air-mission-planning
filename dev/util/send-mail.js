import {transporter} from "@config/email";

/**
 * Send mail to the receipent using options.
 * @param {Object} options options for sending mail.
 * @return {Object} Promise a promise containing status
 */
export function sendMail(options){
    return new Promise((resolve,reject)=>{
        transporter.sendMail(options,(err,res)=>{
            err?reject({
                msg:"Can't send mail -> ",
                err:err,
                file:"util/send-mail.js"
            }):resolve(res.response);
        })
    })
}