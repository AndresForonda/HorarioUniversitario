// Import modules to create the express application
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// app is a variable to use express
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// this is a path or route => http://localhost:8081/status
// app.get('/status', (req, res) => {
//   res.send({
//     message: 'hello world'
//   })
// })

// register endpoint

app.post('/register', (req, res) => {
  res.send({
    message: `Hello ${req.body.email}, Your user was registered! have fun`
  })
})

// The server is listening on this port
app.listen(process.env.PORT || 8081)
