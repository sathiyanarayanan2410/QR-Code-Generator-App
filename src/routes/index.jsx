import { Outlet, createBrowserRouter } from 'react-router-dom'

// Pages
import Root from '../pages/Root'
import Generator from '../pages/Generator'
import Home from './Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import MyQrcode from '../pages/MyQrcode'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/generate',
        element: <Generator />
      },
      {
        path: '/qrcode',
        element: <MyQrcode />
      }
    ]
  },
  {
    path: '/auth',
    element: (
      <div
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-light"
        style={{ background: '#0a0a0a' }}
      >
        <Outlet />
      </div>
    ),
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      }
    ]
  }
])

export default router
