import { useState, useEffect } from 'react'
import authHeader from '../../services/auth-header'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { http } from '../../common/http'
import style from './manageVideos.module.scss'
import classname from 'classnames/bind'

const cb = classname.bind(style)

function MyContents() {
  const [content, setContent] = useState([])
  const [message, setMessage] = useState('')
  const [successful, setSuccessful] = useState(false)
  const [state, setState] = useState(false)

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id
    axios
      .get(http + `crud/mycontents/${userId}`, { headers: authHeader() })
      .then((res) => {
        setContent(res.data.data)
      })
  }, [state])

  const handleDelete = (id) => {
    if (window.confirm('You definitely want to delete?')) {
      axios.delete(http + `crud/delete/${id}`, { headers: authHeader() }).then(
        (res) => {
          setState(!state)
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
    <div className='container mgTop'>
      {message && (
        <>
          <input type='checkbox' hidden id='check' className='check-overlay' />
          <label
            htmlFor='check'
            className={
              successful
                ? 'alert alert-success message text-center'
                : 'alert alert-danger message text-center'
            }
            role='alert'
          >
            <h5>{message}</h5>
            <span style={{ color: 'black' }}>Press any key.</span>
          </label>
          <label className='backgroud-overlay' htmlFor='check'></label>
        </>
      )}
      <h1>My Contents</h1>
      <table className='table mt-4'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Link Video</th>
            <th scope='col' colSpan='2'></th>
          </tr>
        </thead>
        <tbody>
          {content.map((data) => (
            <tr key={data.id} className={cb('rowContent-center')}>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td>{data.linkVideo}</td>
              <td>
                <Link
                  to={`editcontent/${data.id}`}
                  className='btn btn-link size-icon'
                >
                  <i className='fa fa-edit'></i>
                </Link>
              </td>
              <td>
                <span
                  className='btn btn-link button-delete size-icon'
                  onClick={() => handleDelete(data.id)}
                >
                  <label htmlFor='check' className='fa fa-trash-o'></label>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyContents
