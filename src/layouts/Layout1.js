
import "bootstrap/dist/css/bootstrap.min.css"
import { Outlet, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "../App.css"

function Layout1() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
  const [pageLogin, setPageLogin] = useState(true)
  

  useEffect(
    () => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        setCurrentUser(user)
        setShowModeratorBoard(user.roles.includes("ROLE MODERATOR"))
        setShowAdminBoard(user.roles.includes("ROLE ADMIN"))

      }
    }, [])

  const handleClickSignin = () => {
    setPageLogin(false)
  }

  const handleClickHome = () => {
    setPageLogin(true)
  }
  
  const logOut = () => {
    localStorage.removeItem("user");
    setShowModeratorBoard(false)
    setShowAdminBoard(false)
    setCurrentUser(undefined)
  }
  
  return (
    <div>
      <nav className="navbar sticky-top navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link" onClick={handleClickHome}>
              <i className="fa fa-home size-icon"></i>
            </Link>
          </li>
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"roles/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"roles/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"roles/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/createcontent"} className="nav-link">
                Create content
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/mycontents"} className="nav-link">
                My contents
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/myprofile"} className="nav-link">
                <i className="fa fa-user-circle-o size-icon"></i>
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" 
              onClick={logOut}
              >
                <i className="material-icons">exit_to_app</i>
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            {pageLogin && (<li className="nav-item">
              <Link to={"/login"} className="nav-link layout" onClick={handleClickSignin}>
                <span className="layoutCenter">Sign-in&nbsp;</span>
                <i className="fa fa-sign-in" style={{fontSize: '24px'}}></i>
              </Link>
            </li>)}
            {/* <li className="nav-item">
              <Link to={"/contact"} className="nav-link layout">
                <span className="layoutCenter">Contact&nbsp;</span>
                <i className="fa fa-question-circle-o" style={{fontSize: '24px'}}></i>
              </Link>
            </li> */}
          </div>
        )}
      </nav>
      <Outlet/>
    </div>
  )
}
  
export default Layout1