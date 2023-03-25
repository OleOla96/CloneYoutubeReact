import "bootstrap/dist/css/bootstrap.min.css"
import { Outlet, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "../App.css"

function Layout1() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
    
  useEffect(
    () => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        setCurrentUser(user);
        setShowModeratorBoard(user.roles.includes("ROLE MODERATOR"));
        setShowAdminBoard(user.roles.includes("ROLE ADMIN"));
      }
    }, [])
  
  const logOut = () => {
    localStorage.removeItem("user");
    setShowModeratorBoard(false)
    setShowAdminBoard(false)
    setCurrentUser(undefined)
  }
  
  return (
    <div>
      <nav className="navbar sticky-top navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          <i className="fab fa-react"></i>
        </Link>
        <div className="navbar-nav mr-auto">
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
                My profile
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" 
              onClick={logOut}
              >
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <Outlet/>
    </div>
  )
}
  
export default Layout1