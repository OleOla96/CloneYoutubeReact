import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { http } from "../common/http"


function Home() {
  const [content, setContent] = useState([])

  useEffect(
    () => {
      axios.get(http + 'showall').then(res => {
        setContent(res.data.data)
      })
    }, [])

  return (
    <div className="container mt-3">
      {content ? (
      <div className="row">
        {content.map(data => (
          <div className="col-sm-6 col-lg-4" key={data.id}>
            <div className="card mt-4">
              <Link to={`learn/${data.id}`}>
                <img className="card-img-top"
                  src={`https://i.ytimg.com/vi/${data.linkImage}/maxresdefault.jpg`}
                  alt={data.title}
                />
              </Link>
              <div className="card-body">
                <Link to={`learn/${data.id}`} className="card-text">
                  {data.description}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>) : (
        <h2 style={{ textAlign: 'center' }}>Sorry, no content yet!</h2>)}
    </div>
  )
}

export default Home
