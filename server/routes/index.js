const router = require('express').Router()

function init(app) {
  /*
   * Setting Up Routes
   */
  const usersRoute = require('./users-route')(router)
  const patientsRoute = require('./patients-route')(router)
  const authRoute = require('./auth-routes')(router)
  const historicRoute = require('./historic-routes')(router)
  // const adminRoute = require('./admin')(router)

  /*
   * Mounting Routes
   */
  app.use('/api/v1', usersRoute)
  app.use('/api/v1', patientsRoute)
  app.use('/api/v1', authRoute)
  app.use('api/v1', historicRoute)
  // app.use('/api/v1', tweetsRoute)
  // app.use('/api/v1', twitterRoute)
  // app.use('/api/v1/admin', adminRoute)
}

module.exports = { init }
