import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import CrudSevice from '../../services/crudService'
import classname from 'classnames/bind'
import styles from './createEdit.module.scss'
import { useEffect } from 'react'

const cb = classname.bind(styles)

function EditContent() {
  const initialData = {
    title: '',
    description: '',
    linkVideo: '',
  }
  const [dataReq, setDataReq] = useState(initialData)
  const [stateContent, setStateContent] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const form = useRef()
  const checkBtn = useRef()
  const id = useRef()

  useEffect(() => {
    id.current = window.location.pathname.split('/').pop()
    CrudSevice.getUpdateContent(id.current).then((res) => {
      setDataReq({
        ...dataReq,
        title: res.data.data.title,
        description: res.data.data.description,
        linkVideo: res.data.data.linkVideo,
      })
      setStateContent(res.data.data.published)
    })
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDataReq({ ...dataReq, [name]: value })
  }

  console.log(checkBtn)

  const handleUpdate = (e) => {
    e.preventDefault()
    setSuccessful(false)
    setMessage('')

    const data = {
      title: dataReq.title,
      description: dataReq.description,
      linkVideo: dataReq.linkVideo,
      stateContent,
    }

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      CrudSevice.updateContent(id.current, data).then(
        (res) => {
          setMessage(res.data.message)
          setSubmitted(true)
          setSuccessful(true)
        },
        (error) => {
          const resMessage =
            (error.res && error.res.data && error.res.data.message) ||
            error.message ||
            error.toString()
          setMessage(resMessage)
          setSuccessful(false)
          setSubmitted(true)
        }
      )
    }
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
          </div>
          <label
            className='backgroud-overlay'
            htmlFor='check'
            onClick={() => navigate('/managevideos')}
          />
        </>
      ) : (
        <Form
          onSubmit={handleUpdate}
          ref={(c) => {
            form.current = c
          }}
          className={cb('card-validate')}
        >
          <h2 className={cb('card-title', 'text-center')}>Update Content</h2>
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
            <button className={cb('btn-round', 'btn-primary')}>Update</button>
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

export default EditContent
