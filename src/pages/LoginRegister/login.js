import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import axios from 'axios'
import { http } from '../../common/http'
import classname from 'classnames/bind'
import styles from './loginRegister.module.scss'
import { LogoLoginGoogle } from '../../components/Icons'

const cb = classname.bind(styles)

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

    setMessage('')
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
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()

            setLoading(false)
            setMessage(resMessage)
          }
        )
    } else setLoading(false)
  }

  return (
    <div className={cb('login-register')}>
      <div className={cb('card-validate')}>
        <div className={cb('logo-login')}>
          <LogoLoginGoogle />
        </div>
        <Form
          onSubmit={handleLogin}
          ref={(c) => {
            form.current = c
          }}
        >
          <div className={cb('form-group')}>
            <label htmlFor='username'>Username</label>
            <Input
              type='text'
              className={cb('form-control')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={cb('form-group')}>
            <label htmlFor='password'>Password</label>
            <Input
              type='password'
              className={cb('form-control')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={cb('form-group mgt5')}>
            <button
              className={cb('btn-round btn-primary btn-block')}
              disabled={loading}
            >
              {loading && (
                <span className={cb('spinner-border spinner-border-sm')}></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className={cb('form-group')}>
              <div className={cb('alert alert-danger text-center')} role='alert'>
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
          <Link className={cb('text-center nav-link')} to={'/register'}>
            If you don't have an account, click create an account
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default Login
