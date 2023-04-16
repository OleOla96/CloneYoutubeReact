import axios from 'axios'
import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import style from './watch.module.scss'
import { http } from '../../../common/http'

const cb = classNames.bind(style)

function Watch() {
  const [showVideo, setShowVideo] = useState([])

  useEffect(() => {
    const getPathname = window.location.pathname
    const getId = getPathname.split('/')
    const id = getId.slice(-1)
    axios.get(http + `showall/${id}`).then((res) => {
      setShowVideo(res.data.data)
    })
  }, [])

  return (
    <div className={cb('watch', 'mt-4')}>
      <div className='col-sm-9'>
        <iframe
          className={cb('screenVideo')}
          width='854'
          height='428'
          src={`https://www.youtube.com/embed/${showVideo.linkVideo}`}
          title={showVideo.description}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
        <h3>{showVideo.title}</h3>
        <p>{showVideo.description}</p>
      </div>
      <div className='col-sm-3'>Side Video</div>
    </div>
  )
}

export default Watch
