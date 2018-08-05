// Import modules to create the express application
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

// app is a variable to use express
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)
// this is a path or route => http://localhost:8081/status
// app.get('/status', (req, res) => {
//   res.send({
//     message: 'hello world'
//   })
// })

sequelize.sync({force: true})
  .then(() => {
    // The server is listening on this port
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
