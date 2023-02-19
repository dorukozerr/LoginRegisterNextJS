const nodemailer = require('nodemailer')

const sendEmail = args => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.MAIL_ADDRESS,
    to: args.to,
    subject: args.subject,
    html: args.html // html body
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      process.env.NODE_ENV === 'development' &&
        console.log('Email sent: ' + info.response)
    }
  })
}

export default sendEmail
