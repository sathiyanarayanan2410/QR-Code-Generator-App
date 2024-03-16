import dotenv from 'dotenv'

import express from 'express'
import ViteExpress from 'vite-express'
import mongoose from 'mongoose'
import Url from './models/Url.js'

// Routes
import authRouter from './api/auth.js'
import apiRouter from './api/index.js'

const app = express()
dotenv.config()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(process.env.MONOGO_URI)
  .then(() => console.log('Connected to MonogDB'))
  .catch((error) => console.error(error.message))

// Redirecting to the original URL
app.get('/r/:id', async (req, res) => {
  const fullurl = await Url.findOne({ short_url: req.params.id })

  if (fullurl) {
    fullurl.no_of_scans++
    fullurl.save()
    res.redirect(fullurl.full_url)
  } else res.status(404).send({ error: true, message: 'URL not found' })
})

app.use('/api', apiRouter)
app.use('/api/auth', authRouter)

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000..')
)
