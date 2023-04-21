import classname from 'classnames/bind'
import style from './myChannel.module.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CrudSevice from '../../services/crudService'

const cb = classname.bind(style)

function MyChannel() {
  const [content, setContent] = useState([])

  const userInfor = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    CrudSevice.getUserContent(userInfor.id).then(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cb('channelContainer')}>
      <div className={cb('channelHeader')}>
        <div className={cb('avatarEditor', 'mgr5')}>
          {userInfor && userInfor.username.slice(0, 1).toUpperCase()}
        </div>
        {userInfor && (
          <div className={cb('innerHeader')}>
            <div className={cb('innerHeader-meta')}>
              <h2>{userInfor.username}</h2>
              <p>{userInfor.email}</p>
              <p>
                {content.length}&nbsp;{content.length > 1 ? 'videos' : 'video'}
              </p>
            </div>
            <div className={cb('innerHeader-btn')}>
              <button className={cb('show-bg-icon', 'mr-2')}>
                Customise channel
              </button>
              <button className={cb('show-bg-icon')}>
                <Link to={'/managevideos'}>Manage videos</Link>
              </button>
            </div>
          </div>
        )}
      </div>
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
    </div>
  )
}

export default MyChannel
