const nodemailer = require("nodemailer");
require('dotenv').config()
async function SendMail( email, otp ){

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
        subject: "Verify your mail", // Subject line
        text: "Hello world?", // plain text body
        html: `<p>The otp is ${otp}</p>`, // html body
      });

      module.exports= SendMail
}