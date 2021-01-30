const { auth } = require('../middlewares')
const controller = require('../controllers/user.controller')

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/v1/content/public', controller.allAccess)

  app.get('/api/v1/content/user', [auth.verifyToken], controller.userAccess)
}
