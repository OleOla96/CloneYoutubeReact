import { useRef, useState } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import {
  vemail,
  vpassword,
  vusername,
  cpassword,
} from '../../common/validation'
import classname from 'classnames/bind'
import styles from './loginRegister.module.scss'
import AuthSevice from '../../services/authService'

const cb = classname.bind(styles)

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState('')

  const checkBtn = useRef()
  const form = useRef()

  const handleRegister = (e) => {
    e.preventDefault()
    setMessage('')
    setSuccessful(false)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      AuthSevice.signUp(username, email, password).then(
        (res) => {
          setMessage(res.data.message)
          setSuccessful(true)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          setMessage(resMessage)
          setSuccessful(false)
        }
      )
    }
  }

  return (
    <div  className={cb('login-register')}>
      <div className={cb('card-validate')}>
        <img
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='profile-img'
          className={cb('profile-img-card')}
        />
        <Form
          onSubmit={handleRegister}
          ref={(c) => {
            form.current = c
          }}
        >
          {!successful && (
            <>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <Input
                  type='text'
                  className='form-control'
                  placeholder='e.g. tchalla123'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  validations={[vusername]}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <Input
                  type='text'
                  className='form-control'
                  placeholder='e.g. tchalla123@wakanda.gov'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validations={[vemail]}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <Input
                  type='password'
                  className='form-control'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validations={[vpassword]}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='password'>Confirm Password</label>
                <Input
                  type='password'
                  className='form-control'
                  name='confirm'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  validations={[cpassword]}
                  required
                />
              </div>

              <div className='form-group mgt5'>
                <button className='btn-round btn-primary btn-block'>
                  Sign Up
                </button>
              </div>
            </>
          )}
          {message && (
            <div className='form-group'>
              <div
                className={
                  successful ? 'alert alert-success text-center' : 'alert alert-danger text-center'
                }
                role='alert'
              >
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
        </Form>
      </div>
    </div>
  )
}

export default Register
