import { useState } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import axios from "axios"
import authHeader from "../services/auth-header"
import { http } from "../common/http"
import { required } from "../common/validation"


function EditContent() {
  const [description, setDescription] = useState('')
  const [linkimage, setLinkimage] = useState('')
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState('')

  let checkBtn
  let form
  
  const handleRegister = (e) => {
    e.preventDefault()
    setSuccessful(false)
    setMessage('')

    const getPathname = window.location.pathname
    const getId = getPathname.split('/')
    const id = getId.slice(-1)

    form.validateAll()
    if (checkBtn.context._errors.length === 0) {
      axios.put(http + `crud/update/${id}`, { description, linkimage }, { headers: authHeader() })
      .then(
        res => {
          setMessage(res.data.message)
          setSuccessful(true)
        },
        error => {
          const resMessage =
            (error.res &&
              error.res.data &&
              error.res.data.message) ||
            error.message ||
            error.toString()
            setMessage(resMessage)
            setSuccessful(false) 
        }
      )
    }
  }

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: 'center' }}>
        Edit Content
      </h1>
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={handleRegister}
            ref={c => {
              form = c
            }}
          >
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Input
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="linkimage">Link Image</label>
                <Input
                  type="text"
                  className="form-control"
                  name="linkimage"
                  value={linkimage}
                  onChange={e => setLinkimage(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Update</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful
                    ? "alert alert-success"
                    : "alert alert-danger"
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
              checkBtn = c
            }}
          />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default EditContent