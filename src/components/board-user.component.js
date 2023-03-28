import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import authHeader from '../services/auth-header'
import axios from "axios"
import { http } from "../common/http"

function BoardUser() {
  const [content, setContent] = useState([])

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id
    axios.get(http + `roles/${userId}`, {headers: authHeader()})
    .then(res => {
      setContent(res.data)
    },error => {
      setContent(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      )}
    )}, []
  )

  console.log(content)

  return (
    <div className="container mt-3">
      {content ? (
      <div className="row">
        {content.map(data => (
          <div className="col-sm-6 col-lg-4" key={data.id}>
            <div className="card mt-4">
              <Link to={`${data.id}`}>
                <img className="card-img-top"
                  src={`https://i.ytimg.com/vi/${data.linkImage}/maxresdefault.jpg`}
                  alt={data.description}
                />
              </Link>
              <div className="card-body">
                <Link to={`${data.id}`} className="card-text">
                  {data.description}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>) : (
        <h2 style={{ textAlign: 'center' }}>Sorry, no content yet!</h2>)}
    </div>
  )
}

export default BoardUser