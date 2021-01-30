const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')

// development stage
/* db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and resync Database.')
}) */

// production stage
db.sequelize.sync()

const app = express()

// production corsOptions
/* var corsOptions = {
  origin: ['http://localhost:8080']
} */

var corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))

// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// basic route
app.get('/', (req, res) => {
  res.json({
    message:
      'This is the index of all routes in the server. \n This application is created by Kim Francis Corros '
  })
})

// routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/task.routes')(app)
require('./routes/mail.routes')(app)

// set listening port
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
