import jwt from 'jsonwebtoken'

import { Router } from 'express'
import { nanoid } from 'nanoid'
import { checkURL } from '../lib/utils.js'

// Models
import Url from '../models/Url.js'
import User from '../models/User.js'

// API Router
const router = Router()

//
export function authMiddleware(req, res, next) {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).send({ error: true, message: 'Token not recieved' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ error: true, message: 'Invalid token' })
    }

    req.username = user.username
    req.userId = user.userId
    next()
  })
}

// Base Route
router.get('/', (req, res) => {
  res.send('Hello from ExpressJs 👋!')
})

// Generating a short URL
router.post('/generate', authMiddleware, async (req, res) => {
  console.log(req.username)
  if (checkURL(req.body.url)) {
    const user = await User.findOne({ username: req.username })

    const newurl = new Url({
      full_url: req.body.url,
      short_url: nanoid(9),
      user: user._id
    })
    await newurl.save()
    res.send(newurl)
  } else {
    res.status(400).send({ error: true, message: 'Enter Valid URL' })
  }
})

// Update the original URL from the short URL
router.put('/shorturl/:id', async (req, res) => {
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

// Delete the shorturl URL
router.delete('/shorturl/:id', async (req, res) => {
  try {
    const deleteUrl = await Url.deleteOne({ short_url: req.params.id })
    if (!deleteUrl) {
      return res.status(404).send({
        error: true,
        message: 'The URL with the given ID was not found.'
      })
    }

    return res
      .status(200)
      .send({ success: true, message: 'URL deleted successfully.' })
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: 'An error occurred while deleting the URL.'
    })
  }
})

// Get all the user QRCodes
router.get('/user/qrcodes', authMiddleware, async (req, res) => {
  const qrcodes = await Url.find({ user: req.userId })
  res.send(qrcodes)
})

export default router
