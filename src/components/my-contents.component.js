
import { useState, useEffect } from "react"
import authHeader from '../services/auth-header'
import { Link } from "react-router-dom"
import axios from "axios"

const http = 'http://localhost:8080/crud/'

function MyContents () {
  const [content, setContent] = useState(undefined)
  // const [message, setMessage] = useState('')
  const [state, setState] = useState(false)
  
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id
    axios.get(http + `mycontents/${userId}`, {headers: authHeader()})
      .then(res => setContent(res.data.data))
  }, [state])

  const handleDelete = (id) => {
    axios.delete(http + `/delete/${id}`, {headers: authHeader()})
      .then(() => setState(!state))
  }

  return (
    <div className="container mt-4">
      <h1>My Contents</h1>
      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Description</th>
            <th scope="col">link Image</th>
            <th scope="col">Create Time</th>
            <th scope="col" colSpan="2">Update Time</th>
          </tr>
        </thead>
        <tbody>
          {content ? (
            content.map(data => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.description}</td>
              <td>{data.linkImage}</td>
              <td>{data.createdAt}</td>
              <td>{data.updatedAt}</td>
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
            ))) : (
            window.alert('Your content is empty!')
          )}
        </tbody>
      </table>
    </div>
  )
}

export default MyContents
