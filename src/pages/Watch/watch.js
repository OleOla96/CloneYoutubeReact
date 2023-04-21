import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import classNames from 'classnames/bind'

import CrudSevice from '../../services/crudService'
import style from './watch.scss'
import { ActionSideBar } from '../../layouts/ProviderValue'

const cb = classNames.bind(style)

function Watch() {
  const [content, setContent] = useState([])
  const [showVideo, setShowVideo] = useState([])
  const [changeVideo, setChangeVideo] = useState(false)
  const [sateSidebar, setStateSidebar] = useState(true)
  const getWidth = useContext(ActionSideBar)

  useEffect(() => {
    const getId = window.location.pathname.split('/').pop()
    CrudSevice.getPublicContents()
      .then((res) => {
        if (res.data.data.length) {
          const resData = res.data.data
          for (let index in resData) {
            if (resData[index].id == getId) {
              setShowVideo(resData[index])
              resData.splice(index, 1)
              setContent(resData)
              break
            }
          }
        }
      })
      .catch()
  }, [changeVideo])

  useEffect(() => {
    setStateSidebar(window.innerWidth > 1016)
  }, [getWidth])

  return (
    <div className={cb('watch', 'mt-4')}>
      <div className={sateSidebar ? 'col-sm-8' : 'col-sm-12'}>
        <div className='resize'>
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
        </div>
        <h3 className='card-text style-title mt-4'>{showVideo.title}</h3>
        <p>{showVideo.description}</p>
      </div>
      <div className={sateSidebar ? 'col-sm-4' : 'hide'}>
        {content.map((data) => (
          <div key={data.id} className={cb('cardSidebar', 'card mb-4')}>
            <Link
              to={`/watch/${data.id}`}
              onClick={() => setChangeVideo(!changeVideo)}
            >
              <img
                className='card-img-top '
                src={`https://i.ytimg.com/vi/${data.linkVideo}/maxresdefault.jpg`}
                alt={data.title}
              />
            </Link>

            <Link
              to={`/watch/${data.id}`}
              className='card-text'
            >
              <span className='cardSidebar-title'>{data.title}</span>
              <span className='cardSidebar-des'>{data.description}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Watch
