import classname from 'classnames/bind'
import style from '../../layouts/Layout.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import { http } from '../../common/http'

const cls = classname.bind(style)

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

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDataReq({ ...dataReq, [name]: value })
  }

  const saveTutorial = () => {
    const data = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      title: dataReq.title,
      description: dataReq.description,
      linkVideo: dataReq.linkVideo,
      stateContent,
    }

    axios
      .post(
        http + 'crud/create',
        {
          ...data,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        setSubmitted(true)
        setDataReq('')
        setSuccessful(true)
        setMessage(response.data.message)
      })
      .catch((response) => {
        setSuccessful(false)
        setMessage(response.data.message)
      })
  }

  const newTutorial = () => {
    setSubmitted(false)
  }

  return (
    <>
      {submitted ? (
        <>
        <input type="checkbox" hidden id="check" className="check-overlay"/>
        <div className={
            successful
              ? "alert alert-success message text-center"
              : "alert alert-danger message text-center"
          }
          role="alert">
          <h5>{message}</h5>
          <p style={{color: 'black'}}>Do you want to continue creating content?</p>
          <div>
            <button className="btn btn-primary mgr2" onClick={newTutorial}>Yes</button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>No</button>
          </div>
        </div>
        <label className="backgroud-overlay" htmlFor='check' onClick={() => navigate('/')}></label>
      </>
      ) : (
        <div className={cls('card-validate')}>
          <h4 className='card-title text-center'>Create Content</h4>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              className='form-control'
              value={dataReq.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              className='form-control'
              id='description'
              required
              value={dataReq.description}
              onChange={handleInputChange}
              name='description'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='linkVideo'>Link Video</label>
            <input
              type='text'
              className='form-control'
              id='linkVideo'
              required
              value={dataReq.linkVideo}
              onChange={handleInputChange}
              name='linkVideo'
            />
          </div>

          <div className='form-group'>
            <input
              type='checkbox'
              className=''
              id='status'
              checked={dataReq.stateContent}
              onChange={() => setStateContent(!stateContent)}
              name='stateContent'
            />
            <label htmlFor='status'>&ensp;Public</label>
          </div>
          <div className='form-group'>
          <button onClick={saveTutorial} className='btn btn-primary'>
            Submit
          </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateContent
