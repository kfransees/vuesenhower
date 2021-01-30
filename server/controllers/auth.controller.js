const db = require('../models')
const config = require('../config/auth.config')
const User = db.user

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then((user) => {
      res.send({ message: 'User was registered successfully!' })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `The username "${req.body.username}" is nowhere to be found.`
        })
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: 'Wrong password mate. Try again!'
        })
      }

      var accessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400
      })

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        token: accessToken
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      })
    })
}
