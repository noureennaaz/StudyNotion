const nodemailer = require("nodemailer");
require('dotenv').config()
async function SendMail( email,subject , body){

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: { 
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWD,
        },
      });

      const info = await transporter.sendMail({
        from: '"Study Notion " ', 
        to: email, // list of receivers
        subject: subject, 
        text: "Hello world?", 
        html: `${body}`, 
      });

      module.exports= SendMail
}