const express = require('express')
const { Nuxt, Builder } = require('nuxt-edge')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const api = require('./api')
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3111
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27010/ms2'

const initUsers = require('./initUsers')

app.disable('x-powered-by')

app.set('port', port)

app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

io.on('connection', socket => {
  console.log('new')
})

app.set('io', io)

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}

MongoClient.connect(url, async (err, client) => {
  if (err) return err

  const collections = client.db('ms2')

  app.set('store', collections)

  initUsers(app)

  start().then()
})
