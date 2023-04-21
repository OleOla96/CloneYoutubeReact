import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import CrudSevice from '../../services/crudService'
import classname from 'classnames/bind'
import styles from './createEdit.module.scss'

const cb = classname.bind(styles)

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

  const handleSubmit = (e) => {
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

  const newCreate = () => {
    setSubmitted(false)
    setStateContent(false)
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
            <h1>{message}</h1>
            <p style={{ color: 'black' }}>
              Do you want to continue creating content?
            </p>
            <div className='confirm'>
              <button className='btn btn-primary mr-4' onClick={newCreate}>
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
          {/* <label className='backgroud-overlay' htmlFor='check' /> */}
        </>
      ) : (
        <Form
          onSubmit={handleSubmit}
          ref={(c) => {
            form.current = c
          }}
          className={cb('card-validate')}
        >
          <h2 className={cb('card-title', 'text-center')}>Create Content</h2>
          <div className='form-row'>
            <div className='col-md-6 mb-3'>
              <label htmlFor='title'>Title</label>
              <Input
                type='text'
                name='title'
                id='title'
                className={cb('form-control')}
                value={dataReq.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label htmlFor='linkVideo'>Link Video</label>
              <Input
                type='text'
                name='linkVideo'
                id='linkVideo'
                className={cb('form-control')}
                value={dataReq.linkVideo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='col-md-12 mb-3'>
              <label htmlFor='description'>Description</label>
              <Input
                type='text'
                name='description'
                id='description'
                className={cb('form-control')}
                value={dataReq.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className='form-group form-check'>
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
          <div className='form-group'>
            <button className={cb('btn-round', 'btn-primary')}>Create</button>
          </div>
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
