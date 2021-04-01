const nodemailer = require('nodemailer');
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bdevg.india@gmail.com',
      pass: 'Iamindian@99'
    }
});
