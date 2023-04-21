import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import CrudSevice from '../../services/crudService'
import classname from 'classnames/bind'
import styles from './createEdit.module.scss'

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
  const [message, setMessage] = useState('')

  const form = useRef()
  const checkBtn = useRef()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDataReq({ ...dataReq, [name]: value })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setSuccessful(false)
    setMessage('')

    const id = window.location.pathname.split('/').pop()

    const data = {
      title: dataReq.title,
      description: dataReq.description,
      linkVideo: dataReq.linkVideo,
      stateContent,
    }

    form.current.validateAll()

    if (checkBtn.context._errors.length === 0) {
      CrudSevice.updateContent(id, data).then(
        (res) => {
          setMessage(res.data.message)
          setSuccessful(true)
        },
        (error) => {
          const resMessage =
            (error.res && error.res.data && error.res.data.message) ||
            error.message ||
            error.toString()
          setMessage(resMessage)
          setSuccessful(false)
        }
      )
    }
  }

  return (
    <Form
      onSubmit={handleRegister}
      ref={(c) => {
        form.current = c
      }}
      className={cb('card-validate')}
    >
      {!successful && (
        <>
          <h1 className={cb('card-title', 'text-center')}>Edit Content</h1>
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
              checked={stateContent}
              onChange={() => setStateContent(!stateContent)}
              id='status'
              className='form-check-input'
            />
            <label htmlFor='status' className='ml-2'>
              Public
            </label>
          </div>
          <div className='form-group'>
            <button className={cb('btn-round', 'btn-primary')}>Create</button>
          </div>
        </>
      )}

      {message && (
        <div className='form-group'>
          <div
            className={
              successful ? 'alert alert-success' : 'alert alert-danger'
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
  )
}

export default EditContent
