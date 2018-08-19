const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const SubjectsController = require('./controllers/SubjectsController')
module.exports = (app) => {
  // register endpoint
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)

  app.get('/songs',
    SongsController.index)
  app.post('/songs',
    SongsController.post)

  app.get('/subjects',
    SubjectsController.index)
  app.post('/subjects',
    SubjectsController.post)
}
