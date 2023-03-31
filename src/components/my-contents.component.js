
import { useState, useEffect } from "react"
import authHeader from '../services/auth-header'
import { Link } from "react-router-dom"
import axios from "axios"
import { http } from "../common/http"


function MyContents () {
  const [content, setContent] = useState([])
  const [message, setMessage] = useState('')
  const [successful, setSuccessful] = useState(false)
  const [state, setState] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id
    axios.get(http + `crud/mycontents/${userId}`, {headers: authHeader()})
      .then(res => {
        setContent(res.data.data)})
  }, [state])

  const handleDelete = (id) => {
    setConfirmDelete(true)

    if (confirmDelete) {
      axios.delete(http + `crud/delete/${id}`, {headers: authHeader()})
      .then(res => {
        setState(!setState)
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
      {confirmDelete && (
        <div className="backgroud-message">
          <div className="confirm-delete">
            <div className="title-confirm">You definitely want to delete?</div>
            <div className="confirm-yesNo"> 
              <button className="fa fa-check btn-icon state-yes">&nbsp; Yes</button>
              <button className="fa fa-close btn-icon">&nbsp; No</button>
            </div>
          </div>
          {message && (
          <div
            className={
              successful
                ? "alert alert-success message"
                : "alert alert-danger message"
            }
            role="alert"
          >
            {message}
          </div>
          )}
        </div>
      )}
      <h1>My Contents</h1>
      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            {/* <th scope="col">Link Image</th> */}
            <th scope="col">Link Video</th>
            {/* <th scope="col">Create Time</th> */}
            <th scope="col" colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
            {content.map(data => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td>{data.description}</td>
              {/* <td>{data.linkImage}</td> */}
              <td>{data.linkVideo}</td>
              {/* <td>{data.createdAt}</td>
              <td>{data.updatedAt}</td> */}
              <td>
                <Link to={`editcontent/${data.id}`} className="btn btn-link size-icon">
                  <i className="fa fa-edit"></i>
                </Link>
              </td>
              <td>
                <span className="btn btn-link button-delete size-icon" onClick={() => handleDelete(data.id)}>
                  <i className="fa fa-trash-o"></i>
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
