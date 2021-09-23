const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const util = require("util");
const emailConfig = require("../config/email");

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

const generateHTML = () => {
  const html = pug.renderFile(
    `${__dirname}/../views/emails/reset-password.pug`
  );
  return juice(html);
};

let mailOptions = {
  from: "UpTask <no-reply@uptak.com",
  to: "email@email.com",
  subject: "Password Reset",
  text: "Hello",
  html: generateHTML(),
};

transport.sendMail(mailOptions);
