import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../App.css'

function Layout1() {
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  // const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
  const [signin, setSignin] = useState(() => {
    const getPathname = window.location.pathname.split('/').pop()
    return getPathname !== 'login'
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setCurrentUser(user)
      // setShowModeratorBoard(user.roles.includes("ROLE MODERATOR"))
      // setShowAdminBoard(user.roles.includes("ROLE ADMIN"))
    }
  }, [])

  const handleClickSignin = () => {
    setSignin(false)
  }

  const handleClickHome = () => {
    setSignin(true)
  }

  const logOut = () => {
    localStorage.removeItem('user')
    // setShowModeratorBoard(false)
    // setShowAdminBoard(false)
    setCurrentUser(undefined)
    setSignin(false)
  }

  return (
    <>
      <nav className='navbar navbar-expand-md navbar-light bg-light'>
        <li className='navbar-nav'>
          <Link to={'/'} className='navbar-brand' onClick={handleClickHome}>
            <i className='fa fa-home size-icon'></i>
          </Link>
        </li>
        {currentUser && (
          <li className='navbar-nav'>
            <Link to={'roles/user'} className='nav-link'>
              Private Content
            </Link>
          </li>
        )}

        {/* <li className="navbar-nav group-search mx-auto">
          <input type="text" id="search" className="search" placeholder="Search..."/>
          <label htmlFor="search" className="layout-icon-search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>
        </li> */}

        {/* {currentUser &&
          <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        } */}

        {currentUser ? (
          <li className='navbar-nav ml-auto mr-3'>
            <div
              className='nav-link layout-icon-right'
              role='button'
              data-toggle='dropdown'
              aria-expanded='false'
            >
              <i className='fa fa-user-circle-o size-icon'></i>
            </div>
            <div className='dropdown-menu flow-menu'>
              <Link className='dropdown-item' to={'/createcontent'}>
                Create content
              </Link>
              <Link className='dropdown-item' to={'/mycontents'}>
                My contents
              </Link>
              <Link className='dropdown-item' to={'/myprofile'}>
                My Profile
              </Link>
              <div className='dropdown-divider'></div>
              <Link className='dropdown-item' to={'/login'} onClick={logOut}>
                Sign-out &emsp;
                <i className='fa fa-sign-out size'></i>
              </Link>
            </div>
          </li>
        ) : (
          <div className='navbar-nav ml-auto'>
            {signin && (
              <Link
                to={'/login'}
                className='nav-link layout'
                onClick={handleClickSignin}
              >
                <span>Sign-in &nbsp;</span>
                <i className='fa fa-sign-in size-icon'></i>
              </Link>
            )}
          </div>
        )}
      </nav>
      <Outlet />
    </>
  )
}

export default Layout1
