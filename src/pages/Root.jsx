import React from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-light"
      style={{ background: '#0a0a0a' }}
    >
      <h1 className="display-2 fw-semibold mb-5">QRCode Generator 🧬</h1>
      <Outlet />
    </div>
  )
}

export default Root
