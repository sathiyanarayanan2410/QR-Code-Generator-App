import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('You are already logged in')
      navigate('/')
    }
  }, [navigate, isAuthenticated])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)

    const data = {
      username: form.get('username'),
      password: form.get('password')
    }

    axios
      .post('/api/auth/login', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data))
        toast.success('Login successful')
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  return (
    <form className="row g-3" style={{ width: 400 }} onSubmit={onSubmitHandler}>
      <h1>Login</h1>
      <div className="col-12">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
        />
      </div>
      <div className="col-12">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
        />
      </div>

      <div className="col-3 ms-auto">
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </div>
    </form>
  )
}

export default Login
