
import "bootstrap/dist/css/bootstrap.min.css"
import { Outlet, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "../App.css"

function Layout1() {
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  // const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
  const [pageLogin, setPageLogin] = useState(true)
  const [notification, setNotification] = useState([])
  
  useEffect(
    () => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        setCurrentUser(user)
        // setShowModeratorBoard(user.roles.includes("ROLE MODERATOR"))
        // setShowAdminBoard(user.roles.includes("ROLE ADMIN"))

      }
    }, [])

  useEffect(() => {
    // window.addEventListener('fakeNotification', e => setNotification(data => [...data, e.detail]))
    // console.log(notification)
    
    return () => {
      window.removeEventListener('fakeNotification', e => setNotification(data => [...data, e.detail]))
    }
  }, [notification])

  const handleClickSignin = () => {
    setPageLogin(false)
  }

  const handleClickHome = () => {
    setPageLogin(true)
  }
  
  const logOut = () => {
    localStorage.removeItem("user");
    // setShowModeratorBoard(false)
    // setShowAdminBoard(false)
    setCurrentUser(undefined)
    setPageLogin(false)
  }
  
  return (
    <div>
      <nav className="navbar navbar-layout sticky-top navbar-expand navbar-light bg-light">
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/"} className="nav-link" onClick={handleClickHome}>
              <i className="fa fa-home size-icon"></i>
            </Link>
          </li>
          
          {currentUser && (
            <li className="nav-item">
              <Link to={"roles/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        <div className="navbar-nav group-search">
          <input type="text" id="input-search" className="search" placeholder="Search..."/>
          <label htmlFor="input-search" className="layout-icon-search"><i className="fa-solid fa-magnifying-glass"></i></label>
        </div>

        {currentUser ? (
          <div className="navbar-nav">
            <li className="nav-item dropdown dropdown-left">
              <Link className="nav-link" to={''} role="button" aria-expanded="false">
                <i className="fa-regular fa-bell size-icon"></i>
              </Link>
              <ul className="dropdown-menu show-dropdown-left">
                {/* {notification.map(data => {
                  <li key={data.id}>{data}</li>
                })} */}
              </ul>
            </li>
            <li className="nav-item dropdown dropdown-left">
              <Link className="nav-link dropdown-toggle" to={''} role="button" data-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-user-circle-o size-icon"></i>
              </Link>
              <div className="dropdown-menu show-dropdown-left">
                <Link className="dropdown-item" to={"/createcontent"}>Create content</Link>
                <Link className="dropdown-item" to={"/mycontents"}>My contents</Link>
                <Link className="dropdown-item" to={"/myprofile"}>My Profile</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to={"/login"} onClick={logOut}>
                  Sign-out &emsp;
                  <i className="fa fa-sign-out size"></i>
                </Link>
              </div>
            </li>
          </div>
        ) : (
          <div className="navbar-nav .navbar-layout-r">
            {pageLogin && (<li className="nav-item">
              <Link to={"/login"} className="nav-link layout" onClick={handleClickSignin}>
                <span className="layoutCenter">Sign-in &nbsp;</span>
                <i className="fa fa-sign-in" style={{fontSize: '24px'}}></i>
              </Link>
            </li>)}

            {!pageLogin && (<li className="nav-item">
              <Link to={"/register"} className="nav-link layout">
                <span className="style-sign-up">Sign-up</span>
              </Link>
            </li>)}
          </div>
        )}
      </nav>
      <Outlet/>
    </div>
  )
}
  
export default Layout1