import axios from 'axios'
import { useState, useEffect } from 'react'
import { http } from '../../common/http'

function Learn() {
  const [showVideo, setShowVideo] = useState([])

  useEffect(() => {
    console.log('in')
    const getPathname = window.location.pathname
    const getId = getPathname.split('/')
    const id = getId.slice(-1)
    axios.get(http + `showall/${id}`).then((res) => {
      setShowVideo(res.data.data)
    })
  }, [])

  console.log('out')

  return (
    <div className='container mgTop'>
      <div className='col-lg-9'>
        <iframe
          width='640'
          height='360'
          src={`https://www.youtube.com/embed/${showVideo.linkVideo}`}
          title={showVideo.description}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
        <h5>{showVideo.title}</h5>
        <p>{showVideo.description}</p>
      </div>
    </div>
  )
}

export default Learn
