import classname from 'classnames/bind'
import style from './myChannel.module.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import authHeader from '../../services/auth-header'
import axios from 'axios'
import { http } from '../../common/http'

const cls = classname.bind(style)

function MyChannel() {
  const [content, setContent] = useState([])

  const userInfor = useRef()

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem('user'))
    userInfor.current = getUser
    const userId = getUser.id
    axios.get(http + `roles/${userId}`, { headers: authHeader() }).then(
      (res) => {
        if (res.data.length) setContent(res.data)
      },
      (error) => {
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        )
      }
    )
  }, [])

  console.log(userInfor.current)

  return (
    <div className={cls('channelContainer')}>
      <div className={cls('channelHeader')}>
        <div className={cls('avatarEditor', 'mgr3')}>
          {userInfor.current &&
            userInfor.current.username.slice(0, 1).toUpperCase()}
        </div>
        {userInfor.current && (
          <div className={cls('innerHeader')}>
            <div className={cls('innerHeader-meta')}>
              <h4>{userInfor.current.username}</h4>
              <p>{userInfor.current.email}</p>
              <p>
                {content.length}&nbsp;{content.length > 1 ? 'videos' : 'video'}
              </p>
            </div>
            <div className={cls('innerHeader-btn')}>
              <button className={cls('show-bg-icon', 'mgr')}>Customise channel</button>
              <button className={cls('show-bg-icon')}>
                <Link to={'/managevideos'}>Manage videos</Link>
                </button>
            </div>
          </div>
        )}
      </div>
      {content.length ? (
        <div className='row'>
          {content.map((data) => (
            <div className='col-sm-6 col-lg-4' key={data.id}>
              <div className='card mt-4'>
                <Link to={`${data.id}`}>
                  <img
                    className='card-img-top'
                    src={`https://i.ytimg.com/vi/${data.linkVideo}/maxresdefault.jpg`}
                    alt={data.title}
                  />
                </Link>
                <div className='card-body'>
                  <Link to={`${data.id}`} className='card-text'>
                    {data.title}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: 'center' }}>Sorry, no content yet!</h2>
      )}
    </div>
  )
}

export default MyChannel
