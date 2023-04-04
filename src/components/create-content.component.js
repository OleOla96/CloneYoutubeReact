import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import axios from 'axios'
import authHeader from '../services/auth-header'
import { http } from '../common/http'
import { required } from '../common/validation'

function CreateContent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [linkVideo, setLinkVideo] = useState('')
  const [stateContent, setStateContent] = useState(false)

  const checkBtn = useRef()
  const form = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    form.current.validateAll()

    const userId = JSON.parse(localStorage.getItem('user')).id

    if (checkBtn.current.context._errors.length === 0) {
      axios
        .post(
          http + 'crud/create',
          {
            userId,
            title,
            description,
            linkVideo,
            stateContent,
          },
          { headers: authHeader() }
        )
        .then((res) => {
          window.alert(res.data.message)
          setTitle('')
          setDescription('')
          setLinkVideo('')
          setStateContent(false)
        })
    }
  }

  return (
    <div className='container'>
      <div className='col-md-12'>
        <div className='card-validate card-container'>
          <Form
            onSubmit={handleSubmit}
            ref={(c) => {
              form.current = c
            }}
          >
            <h4 className='card-title text-center'>Create Content</h4>
            <div>
              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <Input
                  type='text'
                  className='form-control'
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <Input
                  type='text'
                  className='form-control'
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='linkVideo'>Link Video</label>
                <Input
                  type='text'
                  className='form-control'
                  id='linkVideo'
                  value={linkVideo}
                  onChange={(e) => setLinkVideo(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className='form-group'>
                <input
                  type='checkbox'
                  id='status'
                  checked={stateContent}
                  onChange={() => setStateContent(!stateContent)}
                />
                <label htmlFor='status'>&ensp;Public</label>
              </div>

              <div className='form-group'>
                <button className='btn btn-primary btn-block'>Submit</button>
              </div>
            </div>

            <CheckButton
              style={{ display: 'none' }}
              ref={(c) => {
                checkBtn.current = c
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CreateContent
