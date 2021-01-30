const db = require('../models')
const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: `Uh-oh! The username ${req.body.username} already exists. Please use another username.`
      })

      return
    }

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: `Ooops! The email ${req.body.email} is already in use.`
        })

        return
      }

      next()
    })
  })
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp
