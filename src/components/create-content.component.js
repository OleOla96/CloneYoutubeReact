import { useState } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import axios from "axios"
import authHeader from "../services/auth-header"
import { http } from "../common/http"
import { required } from "../common/validation"

function CrPuContent() {
  const [description, setDescription] = useState('')
  const [linkImage, setLinkImage] = useState('')
  const [linkVideo, setLinkVideo] = useState('')
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState('')
  const [stateContent, setStateContent] = useState(0)

  let checkBtn
  let form
  let changeLink
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccessful(false)
    setMessage('')
    form.validateAll()
    
    const userId = JSON.parse(localStorage.getItem('user')).id
    
    if (checkBtn.context._errors.length === 0) {
      if(stateContent) {changeLink = 'roles/crud/create'}
      else {changeLink = 'crud/create'}
      axios.post(http + changeLink, { userId, description, linkImage, linkVideo }, { headers: authHeader() })
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
        Create Content
      </h1>
      <div className="col-md-12">
        <div className="card-validate card-container">
          <Form
            onSubmit={handleSubmit}
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
                <label htmlFor="linkImage">Link Image</label>
                <Input
                  type="text"
                  className="form-control"
                  name="linkImage"
                  value={linkImage}
                  onChange={e => setLinkImage(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="linkVideo">Link Video</label>
                <Input
                  type="text"
                  className="form-control"
                  name="linkVideo"
                  id="linkVideo"
                  value={linkVideo}
                  onChange={e => setLinkVideo(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="group-input-radio">
                <span className="form-input-radio">
                  <input 
                    type="radio"
                    name="sate"
                    value={0}
                    onClick={e => setStateContent(e.target.value)}
                    defaultChecked
                    id="public"
                  />
                  <label htmlFor="public" className="radio">&ensp;Public</label>
                </span>
                <span className="form-input-radio">
                  <input 
                    type="radio"
                    name="sate"
                    value={1}
                    onClick={e => setStateContent(e.target.value)}
                    id="private"
                  />
                  <label htmlFor="private" className="radio">&ensp;Private</label>
                </span>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Submit</button>
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

export default CrPuContent