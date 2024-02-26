import { createBrowserRouter } from 'react-router-dom'

// Pages
import Root from '../pages/Root'
import Generator from '../pages/Generator'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/generate',
    element: <Generator />
  }
])

export default router
