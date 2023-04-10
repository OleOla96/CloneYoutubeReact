import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import axios from 'axios'
import { http } from '../../common/http'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const checkBtn = useRef()
  const form = useRef()

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      axios
        .post(http + 'auth/signin', { username, password })
        .then((res) => {
          if (res.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(res.data))
          }
        })
        .then(
          () => {
            navigate('/mychannel')
            window.location.reload()
          },
          (error) => {
            const resMessage =
              (error.res && error.res.data && error.res.data.message) ||
              error.message ||
              error.toString()

            setLoading(false)
            setMessage(resMessage)
          }
        )
    } else setLoading(false)
  }

  return (
    <div className='container mgTop'>
      <div className='card-validate card-container'>
        <img
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='profile-img'
          className='profile-img-card'
        />

        <Form
          onSubmit={handleLogin}
          ref={(c) => {
            form.current = c
          }}
        >
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <Input
              type='text'
              className='form-control'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <Input
              type='password'
              className='form-control'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-primary btn-block' disabled={loading}>
              {loading && (
                <span className='spinner-border spinner-border-sm'></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: 'none' }}
            ref={(c) => {
              checkBtn.current = c
            }}
          />

          <Link className='text-center nav-link' to={'/register'}>
            If you don't have an account, click create an account
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default Login
