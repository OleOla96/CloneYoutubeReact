import classname from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import style from './header.module.scss'
import Search from './Search'
import {
  BellIcon,
  CameraIcon,
  ChannelIcon,
  LogoIcon,
  SidebarIcon,
  HomeIcon,
  LibraryIcon,
  ShortIcon,
  SubscriptionsIcon,
  SingoutIcon,
  StudioIcon,
  SwitchIcon,
  VoiceIcon,
} from '../../components/Icons'

const cb = classname.bind(style)

function Header() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [signin, setSignin] = useState(() => {
    const getPathname = window.location.pathname.split('/').pop()
    return getPathname !== 'login'
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  const handleClickSignin = () => {
    setSignin(false)
  }

  const logOut = () => {
    localStorage.removeItem('user')
    setCurrentUser(undefined)
    setSignin(false)
  }

  return (
    <nav className={cb('header')}>
      <div className={cb('headerLeft')}>
        <input
          type='checkbox'
          hidden
          id='checkSidebar'
          className={cb('btnSidebar-sup')}
        />
        <label htmlFor='checkSidebar' className={cb('bg-cl-fade')}></label>
        <label htmlFor='checkSidebar' className={cb('size-bg', 'mgb-0')}>
          <span className={cb('show-bg-icon', 'btn')}>
            <SidebarIcon className={cb('bg-icon')} />
          </span>
        </label>
        <div className={cb('showFull-Sidebar')}>
          <div className={cb('headerSidebar', 'ml-4')}>
            <label htmlFor='checkSidebar' className={cb('size-bg', 'mgb-0')}>
              <span className={cb('btn')}>
                <SidebarIcon className={cb('bg-icon')} />
              </span>
            </label>
            <div className={cb('logoHeader')}>
              <Link to={'/'} className={cb('navbarBrand')}>
                <LogoIcon className={cb('brandIcon')} />
              </Link>
              <span className={cb('brandIcon-sup')}>VN</span>
            </div>
          </div>
          <Link to={'/home'} className={cb('btnSidebar')}>
            <div className={cb('content-inline')}>
              <HomeIcon className={cb('bg-icon')} />
            </div>

            <div className={cb('content-inline')}>
              <span className={cb('style-text')}>Home</span>
            </div>
          </Link>
          <div className={cb('btnSidebar')}>
            <div className={cb('content-inline')}>
              <ShortIcon className={cb('bg-icon')} />
            </div>

            <div className={cb('content-inline')}>
              <span className={cb('style-text')}>Shorst</span>
            </div>
          </div>
          <div className={cb('btnSidebar')}>
            <div className={cb('content-inline')}>
              <SubscriptionsIcon className={cb('bg-icon')} />
            </div>

            <div className={cb('content-inline')}>
              <span className={cb('style-text')}>Subscriptions</span>
            </div>
          </div>
          <div className={cb('btnSidebar')}>
            <div className={cb('content-inline')}>
              <LibraryIcon className={cb('bg-icon')} />
            </div>

            <div className={cb('content-inline')}>
              <span className={cb('style-text')}>Library</span>
            </div>
          </div>
        </div>
        <div className={cb('logoHeader')}>
          <Link to={'/'} className={cb('navbarBrand')}>
            <LogoIcon className={cb('brandIcon')} />
          </Link>
          <span className={cb('brandIcon-sup')}>VN</span>
        </div>
      </div>
      <div className={cb('headerCenter')}>
        <Search />
        <div className={cb('size-bg')}>
          <Tippy content='Search with your voice'>
            <button className={cb('show-bg-icon')}>
              <VoiceIcon className={cb('bg-icon')} />
            </button>
          </Tippy>
        </div>
      </div>
      {currentUser ? (
        <div className={cb('headerRight')}>
          <div className={cb('size-bg')}>
            <Tippy content='Create'>
              <Link to={'/createcontent'} className={cb('show-bg-icon')}>
                <CameraIcon className={cb('bg-icon')} />
              </Link>
            </Tippy>
          </div>
          <div className={cb('size-bg')}>
            <Tippy content='Notifications'>
              <button className={cb('show-bg-icon')}>
                <BellIcon className={cb('bg-icon')} />
              </button>
            </Tippy>
          </div>
          <input
            type='checkbox'
            hidden
            id='checkDropdown'
            className={cb('checkDropdown-menu')}
          />
          <label htmlFor='checkDropdown' className={cb('bg-cl-trans')}></label>
          <label htmlFor='checkDropdown' className={cb('sizeM-bg')}>
            <span className={cb('bg-color', 'bgM-icon')}>
              {currentUser.username.slice(0, 1).toUpperCase()}
            </span>
          </label>
          <div className={cb('dropdown-menu')}>
            <div className={cb('baseProfile')}>
              <div className={cb('baseProfile-mr')}>
                <span className={cb('bg-color', 'bgM-icon')}>
                  {currentUser.username.slice(0, 1).toUpperCase()}
                </span>
              </div>
              <div className={cb('inforProfile')}>
                <span className={cb('inforProfile-user')}>
                  {currentUser.username}
                </span>
                <span>{currentUser.email}</span>
                <span className={cb('inforProfile-link')}>
                  Manage your Google Account
                </span>
              </div>
            </div>
            <div className={cb('dropdown-divider')}></div>
            <Link className={cb('dropdown-item')} to={'/mychannel'}>
              <ChannelIcon className={cb('bg-icon')} />
              Your channel
            </Link>
            <div className={cb('dropdown-item', 'btn')}>
              <StudioIcon className={cb('bg-icon')} />
              YouTube Studio
            </div>
            <div className={cb('dropdown-item', 'btn')}>
              <SwitchIcon className={cb('bg-icon')} />
              Switch account
            </div>
            <Link
              className={cb('dropdown-item')}
              to={'/login'}
              onClick={logOut}
            >
              <SingoutIcon className={cb('bg-icon')} />
              Sign-out
            </Link>
          </div>
        </div>
      ) : (
        <div className={cb('headerRight')}>
          {signin && (
            <Link
              to={'/login'}
              className={cb('nav-link', 'btn-signin')}
              onClick={handleClickSignin}
            >
              <i className={cb('fa-regular fa-circle-user', 'icon-signin')}></i>
              <span className={cb('text-signin')}>Sign in</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Header
