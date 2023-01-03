module.exports = (dbConnection) => {

  const express = require('express')
  const app = express()
  const passport = require('passport')
  const session = require('express-session')
  const MongoStore = require('connect-mongo')
  const mongoSanitize = require('express-mongo-sanitize')
  const morgan = require('morgan')
  const logger = require('../config/logger')
  const User = require('../models/user')
  const userRoutes = require('../routes/api/user')
  const transferRoutes = require('../routes/api/transfers')
  const headerRoutes = require('../routes/api/headers')
  const recurringDocRoutes = require('../routes/api/docs')
  const errorHandler = require('../middleware/errorHandler')
  const swaggerSpecs = require('../config/swagger/UISetup')
  const swaggerUI = require('swagger-ui-express')
  

  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  app.use(mongoSanitize())

  
  //session config
  const mongoDriver = dbConnection.getClient()
  const store = MongoStore.create({ client: mongoDriver })
  if (process.env.NODE_ENV === 'production') {    
    //when node.js is behind proxy, this is required to enable the secure cookie setting option for sessions
    app.set('trust proxy', 1)  
  }
  app.use(session({
    store,
    name: 'mySession',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 28800000, //expires after 8 hours
      secure:  process.env.NODE_ENV === 'production' ? true : false 
    }  
  }))


  //passport config
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(User.createStrategy())
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())


  //HTTP request logging
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined', { stream: logger.stream }))
  }


  //disables cacheable authentication (i.e. logging in with the browser's back button)
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })


  //API routes
  app.use('/api/user', userRoutes)
  app.use('/api/headers', headerRoutes)
  app.use('/api/docs', recurringDocRoutes)
  app.use('/api/transfers', transferRoutes)


  //API documentation route
  if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
  }


  //all other routes
  app.get('/', (req, res) => {
    res.send('Welcome to Image-To-CSV, ready to receive an API call.')
  })
  app.get(/.*/, (req, res) => {
    res.send('Invalid API call, please try again.')
  })

  
  //route error handler 
  app.use(errorHandler)


  return app
}
