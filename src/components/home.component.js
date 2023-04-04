import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { http } from '../common/http'

function Home() {
  const [content, setContent] = useState([])

  useEffect(() => {
    console.log('in')
    axios.get(http + 'showall').then((res) => {
      if (res.data.data.length) setContent(res.data.data)
    })
  }, [])

  console.log('out')

  return (
    <div className='container mt-3'>
      {content.length ? (
        <div className='row'>
          {content.map((data) => (
            <div className='col-sm-6 col-lg-4' key={data.id}>
              <div className='card mt-4'>
                <Link to={`learn/${data.id}`}>
                  <img
                    className='card-img-top'
                    src={`https://i.ytimg.com/vi/${data.linkVideo}/maxresdefault.jpg`}
                    alt={data.title}
                  />
                </Link>
                <div className='card-body'>
                  <Link to={`learn/${data.id}`} className='card-text'>
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

export default Home
