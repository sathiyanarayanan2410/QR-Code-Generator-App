import express from 'express'
import ViteExpress from 'vite-express'
import mongoose from 'mongoose'
import User from './models/user_model.js'
import url from './models/url_model.js'

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/qrcode-app').then(() => console.log("Connected to MonogDB"))
.catch((error) => console.error(error.message))

app.get('/api/hello', (req, res) => {
  res.send('Hello from ExpressJs 👋!')
})

app.get('/', (req,res)=>
{
  const newurl = new url({full_url:'https://github.com/ai/nanoid#readme'})
  res.send(newurl.short_url) 
});


ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000..')
)
