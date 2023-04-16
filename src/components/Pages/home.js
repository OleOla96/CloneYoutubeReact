import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { http } from '../../common/http'

function Home() {
  const [content, setContent] = useState([])

  useEffect(() => {
    axios.get(http + 'showall').then((res) => {
      if (res.data.data.length) setContent(res.data.data)
    })
  }, [])

  return (
    <>
      {content.length ? (
        <div className='row'>
          {content.map((data) => (
            <div className='col-sm-6 col-lg-4' key={data.id}>
              <div className='card cardYoutube mt-4'>
                <Link to={`watch/${data.id}`}>
                  <img
                    className='card-img-top '
                    src={`https://i.ytimg.com/vi/${data.linkVideo}/maxresdefault.jpg`}
                    alt={data.title}
                  />
                </Link>
                <h4>
                  <Link to={`watch/${data.id}`} className='card-text style-title mt-2'>
                    {data.title}
                  </Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: 'center' }}>Sorry, no content yet!</h2>
      )}
    </>
  )
}

export default Home
