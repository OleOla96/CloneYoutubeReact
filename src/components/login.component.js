import { useState } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { http } from "../common/http"
import { required } from "../common/validation"

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  let checkBtn
  let form

  const navigate = useNavigate()
  
  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    form.validateAll()

    if (checkBtn.context._errors.length === 0) {
      axios.post(http + 'auth/signin', {username, password})
      .then(res => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data))
        }})
        .then(() => {
          navigate("/myprofile")
          window.location.reload()
        },
        error => {
          const resMessage =
            (error.res &&
              error.res.data &&
              error.res.data.message) ||
            error.message || error.toString()

            setLoading(false)
            setMessage(resMessage)
          })
        }
    else setLoading(false)
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
          onSubmit={handleLogin}
          ref={c => {
            form = c
          }}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              validations={[required]}
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
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={c => {
              checkBtn = c
            }}
          />
        </Form>
      </div>
    </div>
  )
}

export default Login