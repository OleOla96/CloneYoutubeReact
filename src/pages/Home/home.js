import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classname from 'classnames/bind'
import styles from './home.scss'
import CrudSevice from '../../services/crudService'

const cb = classname.bind(styles)

function Home() {
  const [content, setContent] = useState([])

  useEffect(() => {
    CrudSevice.getPublicContents().then((res) => {
      if (res.data.data.length) setContent(res.data.data)
    })
  }, [])

  return (
    <>
      {content.length ? (
        <div className='row'>
          {content.map((data) => (
            <div className='col-sm-6 col-lg-4' key={data.id}>
              <div className={cb('cardYoutube', 'card mt-4')}>
                <Link to={`watch/${data.id}`}>
                  <img
                    className='card-img-top'
                    src={`https://i.ytimg.com/vi/${data.linkVideo}/maxresdefault.jpg`}
                    alt={data.title}
                  />
                </Link>

                <Link
                  to={`watch/${data.id}`}
                  className='card-text style-title mt-2'
                >
                  {data.title}
                </Link>
                <p className='card-des'>{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className='text-center'>Sorry, no content yet!</h2>
      )}
    </>
  )
}

export default Home
