import jwt from 'jsonwebtoken'

import { Router } from 'express'
import { authMiddleware } from './index.js'

// Models
import User from '../models/User.js'

// Auth Router
const router = Router()

// Verify the user
router.get('/verify', authMiddleware, (req, res) => {
  return res.send({ success: true })
})

// Register
router.post('/register', async (req, res) => {
  const { fullname, username, password } = req.body

  const existinguser = await User.findOne({ username })

  if (existinguser) {
    return res.status(400).send({ error: true, message: 'User already exists' })
  }

  const newuser = new User({ fullname, username, password })
  await newuser.save()
  res.status(201).send({ message: 'User registered successfully' })
})

// Login
router.post('/login', async (req, res) => {
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

export default router
