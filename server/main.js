import dotenv from 'dotenv'

import express from 'express'
import ViteExpress from 'vite-express'
import mongoose from 'mongoose'
import User from './models/User.js'
import Url from './models/Url.js'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'

const app = express()
dotenv.config()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect('mongodb://127.0.0.1:27017/qrcode-app')
  .then(() => console.log('Connected to MonogDB'))
  .catch((error) => console.error(error.message))

function checkURL(inputfullurl) {
  try {
    new URL(inputfullurl)
    return true
  } catch (error) {
    return false
  }
}

function authMiddleware(req, res, next) {
  const token = req.headers['authorization']

  console.log(token)

  if (!token) {
    return res.status(401).send({ error: true, message: 'Token not recieved' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ error: true, message: 'Invalid token' })
    }

    req.username = user.username
    next()
  })
}

app.get('/api/auth/verify', authMiddleware, (req, res) => {
  return res.send({ success: true })
})

app.get('/api', (req, res) => {
  res.send('Hello from ExpressJs 👋!')
})

// Generating a short URL
app.post('/api/generate', authMiddleware, async (req, res) => {
  if (checkURL(req.body.url)) {
    const user = User.find({ username: req.username })._id
    const newurl = new Url({ full_url: req.body.url, user })
    newurl.short_url = nanoid(9)
    await newurl.save()
    res.send(newurl)
  } else {
    res.send('Enter Valid URL')
  }
})

// Redirecting to the original URL
app.get('/r/:id', async (req, res) => {
  const fullurl = await Url.findOne({ short_url: req.params.id })

  if (fullurl) res.redirect(fullurl.full_url)
  else res.status(404).send({ error: true, message: 'URL not found' })
})

// Update the original URL
app.put('/api/shorturl/:id', async (req, res) => {
  const existingurl = await Url.findOne({ short_url: req.params.id })

  if (!existingurl)
    return res.status(404).send({
      error: true,
      message: 'The URL with the given ID was not found.'
    })

  existingurl.full_url = req.body.url
  await existingurl.save()
  return res.send(existingurl)
})

app.delete('/api/shorturl/:id', async (req, res) => {
  try {
    const deleteUrl = await Url.deleteOne({ short_url: req.params.id })
    if (!deleteUrl.n) {
      return res.status(404).send({
        error: true,
        message: 'The URL with the given ID was not found.'
      })
    }
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: 'An error occurred while deleting the URL.'
    })
  }
})

app.post('/api/auth/register', async (req, res) => {
  const { fullname, username, password } = req.body

  const existinguser = await User.findOne({ username })

  if (existinguser) {
    return res.status(400).send({ error: true, message: 'User already exists' })
  }

  const newuser = new User({ fullname, username, password })
  await newuser.save()
  res.status(201).send({ message: 'User registered successfully' })
})

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body
  const existingUser = await User.findOne({ username })

  if (!existingUser) {
    return res
      .status(404)
      .send({ error: true, message: 'The user does not exist' })
  }

  if (existingUser.password !== password) {
    return res.status(401).send({ error: true, message: 'Invalid Password' })
  }

  const accessToken = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '30 days'
  })

  return res.send({
    username: existingUser.username,
    fullname: existingUser.fullname,
    token: accessToken
  })
})

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000..')
)
