
import { useState, useEffect } from "react"
import authHeader from '../services/auth-header'
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import axios from "axios"

const http = 'http://localhost:8080/crud/'

function MyContents () {
  const [content, setContent] = useState([])
  // const [message, setMessage] = useState('')
  const [state, setState] = useState(false)
  
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id
    axios.get(http + `mycontents/${userId}`, {headers: authHeader()})
      .then(res => setContent(res.data.data))
  }, [state])

  const handleDelete = (e) => {
    const id = e.target.value
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
                <Link to={`editcontent/${data.id}`} className="btn btn-link">Edit</Link>
              </td>
              <td>
                <Button onClick={(e) => handleDelete(e)} value={data.id} variant="danger">Delete</Button>
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
