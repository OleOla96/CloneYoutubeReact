import axios from "axios"
import { useState, useEffect } from "react"
import authHeader from '../services/auth-header'
import { http } from "../common/http"

function ContentPrivate() {
  const [showVideo, setShowVideo] = useState([])

  useEffect(
    () => {
      const userId = JSON.parse(localStorage.getItem('user')).id
      const getPathname = window.location.pathname
      const getId = getPathname.split('/')
      const id = getId.slice(-1)
      axios.get(http + `roles/${userId}/${id}`, { headers: authHeader() })
      .then(res => {
        setShowVideo(res.data.data)
      })
    }, [])
  
  console.log(showVideo)

  return (
    <div className="container">
      <div className="mt-4">
        <div className="col-lg-9">
          <iframe width="640" height="360" 
          src={`https://www.youtube.com/embed/${showVideo.linkVideo}`} 
          title={showVideo.title} frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen></iframe>
          <h5>{showVideo.title}</h5>
          <p>{showVideo.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ContentPrivate
