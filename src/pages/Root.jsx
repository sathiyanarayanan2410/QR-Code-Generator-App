import React from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-light"
      style={{ background: '#0a0a0a' }}
    >
      <Outlet />
    </div>
  )
}

export default Root
