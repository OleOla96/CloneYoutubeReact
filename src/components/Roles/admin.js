import axios from "axios"
import { useState, useEffect } from "react"
import authHeader from '../../services/auth-header'
import { http } from "../../common/http"

function BoardAdmin() {
  const [content, setContent] = useState('')

  useEffect(() => {
    axios.get(http + 'roles/admin', {headers: authHeader()})
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
    )}  
  )

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  )
}

export default BoardAdmin