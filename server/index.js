const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const app = express()

// // Import .env
require('dotenv').config()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// Import api/server router
const router = require('./routes')

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () =>
    consola.success({
      message: 'Conected to MongoDB!',
      badge: true
    })
)

// Cors config options
const whitelist = ['localhost']
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  // credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Need to pass ther parsers and others server middlewares
// outside the async func read below
app.use(express.json())
app.use(bodyParser.json())
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'))
}

// Init and setup the router after the parser but
// before the async function of nuxt no rendering
// the router after parsers
router.init(app)

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Give others middlewares to express
  app.use(helmet())
  app.use(cors(corsOptions))

  // Listen the server
  app.listen(port, host)
  consola.ready({
    // message: `Server listening on http://${host}:${port}`,
    message: `Server listening on port: ${port}`,
    badge: true
  })
}
start()
