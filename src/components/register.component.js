import { useRef, useState } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import axios from "axios"
import { http } from "../common/http"
import { required, vemail, vpassword, vusername, cpassword } from "../common/validation"

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
    setEmail('')
    setSuccessful(false)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      axios.post(http + 'auth/signup', {username, email, password}).then(
        res => {
          setEmail(res.data.message)
          setSuccessful(true)
        },error => {
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
    <div className="col-md-12">
      <div className="card-validate card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form
          onSubmit={handleRegister}
          ref={c => {
            form.current = c
          }}
        >
        {!successful && (
          <>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                placeholder="e.g. tchalla123"
                value={username}
                onChange={e => setUsername(e.target.value)}
                validations={[required, vusername]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                placeholder="e.g. tchalla123@wakanda.gov"
                value={email}
                onChange={e => setEmail(e.target.value)}
                validations={[required, vemail]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                validations={[required, vpassword]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <Input
                type="password"
                className="form-control"
                name="confirm"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                validations={[required, cpassword]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
          </>
        )}

        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton
          style={{ display: "none" }}
          ref={c => {
            checkBtn.current = c
          }}
        />
        </Form>
      </div>
    </div>
  )
}

export default Register