const nodemailer = require("nodemailer");
const config = require("../config/email.config.json")
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: config.user,
        pass: config.password
    }
})

var mailOptions = {
  from: config.receiver, // sender address
  to: config.receiver, // list of receivers
  subject: '' , // Subject line
  html: ''// plain text body
}

module.exports = function (title, html) {
  mailOptions.subject = title
  mailOptions.html = html
	transporter.sendMail(mailOptions, (err, info) => {
	   if(err)
	     console.log(err)
	   else
	     console.log('📬 Email Send !');
	});
}