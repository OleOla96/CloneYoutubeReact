import { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import CrudSevice from '../../../services/crudService'

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
    <div className='container mt-4'>
      <div className='col-md-12'>
          <Form
            onSubmit={handleRegister}
            ref={(c) => {
              form.current = c
            }}
            className='mt-4'
          >
            {!successful && (
              <>
                <h1 className='card-title text-center'>Edit Content</h1>
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
                  <div className='col-md-12 mb-3'>
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
                </div>

                <div className='form-group form-check ml-1'>
                  <input
                    type='checkbox'
                    checked={stateContent}
                    onChange={() => setStateContent(!stateContent)}
                    id='status'
                    className='form-check-input'
                  />
                  <label htmlFor='status'>&ensp;Public</label>
                </div>

                <button className='btn btn-primary btn-block'>Update</button>
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
        </div>
      </div>

  )
}

export default EditContent
