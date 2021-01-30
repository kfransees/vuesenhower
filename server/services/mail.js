const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '93d539e03c300a',
    pass: '6fcb7606dc61a2'
  }
})

exports.sendMail = (req, res) => {
  const mailOptions = {
    from: req.body.email,
    to: 'corros121@gmail.com',
    subject: req.body.name + ': Email from website',
    text: req.body.message
  }

  transport.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(500).send({
        message: 'Message failed to send. Try again later.'
      })
    } else {
      res.status(200).send({
        message: 'Sent successfully! Thanks for sending me a message.'
      })
    }
  })
}
