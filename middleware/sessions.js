const express = require('express')
const app = express()

const session = require('express-session')
const MemoryStore = require('memorystore')(session)

const fn = app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    
  }))
  

  module.exports = fn;