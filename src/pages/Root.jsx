import React from 'react'
import axios from 'axios'

const Root = () => {
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    axios //
      .get('/api/hello')
      .then((response) => setText(response.data))
  }, [])

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center text-light"
      style={{ background: '#0a0a0a' }}
    >
      <h1 className="display-1 fw-semibold">{text}</h1>
    </div>
  )
}

export default Root
