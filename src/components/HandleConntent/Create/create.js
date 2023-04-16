import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import CrudSevice from '../../../services/crudService'

function CreateContent() {
  const initialData = {
    title: '',
    description: '',
    linkVideo: '',
  }

  const [dataReq, setDataReq] = useState(initialData)
  const [stateContent, setStateContent] = useState(false)
  const [message, setMessage] = useState('')
  const [successful, setSuccessful] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const navigate = useNavigate()
  const form = useRef()
  const checkBtn = useRef()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDataReq({ ...dataReq, [name]: value })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setMessage('')
    setSuccessful(false)

    const data = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      title: dataReq.title,
      description: dataReq.description,
      linkVideo: dataReq.linkVideo,
      stateContent,
    }

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      CrudSevice.createContent(data)
        .then((response) => {
          setMessage(response.data.message)
          setSubmitted(true)
          if (response) {
            setDataReq('')
            setSuccessful(true)
          } else {
            setSuccessful(false)
            setMessage('Can not connect to server')
          }
        })
        .catch((response) => {
          setSubmitted(true)
          setSuccessful(false)
          setMessage(response.data.message)
        })
    }
  }

  const newTutorial = () => {
    setSubmitted(false)
  }

  return (
    <>
      {submitted ? (
        <>
          <input type='checkbox' hidden id='check' className='check-overlay' />
          <div
            className={
              successful
                ? 'alert alert-success message text-center'
                : 'alert alert-danger message text-center'
            }
            role='alert'
          >
            <h5>{message}</h5>
            <p style={{ color: 'black' }}>
              Do you want to continue creating content?
            </p>
            <div>
              <button className='btn btn-primary mr-4' onClick={newTutorial}>
                Yes
              </button>
              <button
                className='btn btn-secondary'
                onClick={() => navigate('/')}
              >
                No
              </button>
            </div>
          </div>
          <label
            className='backgroud-overlay'
            htmlFor='check'
            onClick={() => navigate('/')}
          ></label>
        </>
      ) : (
        <Form
          onSubmit={handleRegister}
          ref={(c) => {
            form.current = c
          }}
          className='mt-4'
        >
          <h2 className='card-title text-center'>Create Content</h2>
          <div className='form-row'>
            <div className='col-md-6 mb-3'>
              <label htmlFor='title'>Title</label>
              <Input
                type='text'
                name='title'
                id='title'
                className='form-control'
                value={dataReq.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label htmlFor='linkVideo'>Link Video</label>
              <Input
                type='text'
                className='form-control'
                id='linkVideo'
                required
                value={dataReq.linkVideo}
                onChange={handleInputChange}
                name='linkVideo'
              />
            </div>
            <div className='col-md-12 mb-3'>
              <label htmlFor='description'>Description</label>
              <Input
                type='text'
                className='form-control'
                id='description'
                required
                value={dataReq.description}
                onChange={handleInputChange}
                name='description'
              />
            </div>
            <div className='form-group form-check ml-2'>
              <input
                type='checkbox'
                id='state'
                className='form-check-input'
                checked={stateContent}
                onChange={() => setStateContent(!stateContent)}
              />
              <label htmlFor='state' className='ml-2'>
                Public
              </label>
            </div>
          </div>
          <button className='btn btn-primary'>Create</button>
          <CheckButton
            style={{ display: 'none' }}
            ref={(c) => {
              checkBtn.current = c
            }}
          />
        </Form>
      )}
    </>
  )
}

export default CreateContent
