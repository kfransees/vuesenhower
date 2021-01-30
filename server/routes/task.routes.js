const { auth } = require('../middlewares')
const controller = require('../controllers/task.controller')

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post('/api/v1/tasks/create', [auth.verifyToken], controller.createTask)

  app.get('/api/v1/tasks/:id', [auth.verifyToken], controller.getAllTasks)

  app.delete(
    '/api/v1/tasks/delete/:id',
    [auth.verifyToken],
    controller.deleteTask
  )

  app.put(
    '/api/v1/tasks/:id',
    [auth.verifyToken],
    controller.updateTaskCompleted
  )

  app.delete(
    '/api/v1/tasks/clear/:id',
    [auth.verifyToken],
    controller.deleteTasks
  )
}
