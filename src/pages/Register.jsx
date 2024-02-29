import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Register = () => {
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
      fullname: form.get('fullname'),
      username: form.get('username'),
      password: form.get('password')
    }

    try {
      const response = await axios.post('/api/auth/register', data)

      if (response.status === 201) {
        navigate('/auth/login')
        return toast.success(response.data.message)
      }
    } catch (e) {
      toast.error(e.response.data.message)
    }
  }

  return (
    <form className="row g-3" style={{ width: 400 }} onSubmit={onSubmitHandler}>
      <h1>Register</h1>
      <div className="col-12">
        <label htmlFor="fullname" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="fullname"
          name="fullname"
        />
      </div>
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
          Register
        </button>
      </div>
    </form>
  )
}

export default Register
