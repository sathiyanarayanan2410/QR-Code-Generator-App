import express from 'express'
import ViteExpress from 'vite-express'

const app = express()

app.get('/api/hello', (req, res) => {
  res.send('Hello from ExpressJs 👋!')
})

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
)
