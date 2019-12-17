require('dotenv').config()

const express = require('express')
const app = express()

const webhooks = require('datashaman-webhooks')
webhooks.boot(app, process.env.GITHUB_SECRET)

app.post('/', webhooks.router((req, res, event) => {
  switch (event) {
  case 'ping':
    res.send('Ping')
    break
  default:
    res.send('Unhandled event: ' + event)
  }
}))

app.listen(process.env.PORT || 8080)
