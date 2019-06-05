const nodemailer = require("nodemailer");
const config = require("../config/email.config.json")
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: config.user,
        pass: config.password
    }
})

const mailOptions = {
  from: config.receiver, // sender address
  to: config.receiver, // list of receivers
  subject: '🦊 New Flat !', // Subject line
  html: '<p>Your html here</p>'// plain text body
}

module.exports = function () {
	transporter.sendMail(mailOptions, (err, info) => {
	   if(err)
	     console.log(err)
	   else
	     console.log(info);
	});
}