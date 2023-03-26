import { useState, useEffect } from "react"
import authHeader from '../services/auth-header'
import axios from "axios"
import { http } from "../common/http"

function BoardUser() {
  const [content, setContent] = useState([])

  useEffect(() => {
    axios.get(http + 'roles/user', {headers: authHeader()})
    .then(res => {
      setContent(res.data.data)
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

  return (
    <div className="container">
      <div className="mt-4">
        {content ? (content.map(data => (
        <div className="col-lg-9" key={data.id}>
          {/* <video width="640" height="360" 
          src={data.linkVideo} 
          title="YouTube video player" frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen></video> */}
          <img src={`${data.linkImage}`} width="640" height="360" alt={data.name}/>
          <h5>{data.name}</h5>
        </div>
        ))) : (
          <h2 className="mt-4">No Content</h2>
        )}
      </div>
    </div>
  )
}

export default BoardUser