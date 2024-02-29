import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Link to="/generate" className="btn btn-light me-2">
            Generate QR Code
          </Link>
          <Link to="/qrcode" className="btn btn-outline-light me-2">
            My QR Code
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/auth/login"
            className="btn btn-light me-2"
            style={{ width: 100 }}
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="btn btn-outline-light"
            style={{ width: 100 }}
          >
            Register
          </Link>
        </>
      )}
    </div>
  )
}

export default Home
