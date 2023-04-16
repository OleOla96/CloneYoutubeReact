import { Link } from 'react-router-dom'
import { useContext } from 'react'
import classname from 'classnames/bind'
import style from './SideBar.module.scss'
import { ActionSideBar } from '../ProviderValue'
import {
  HomeIcon,
  LibraryIcon,
  ShortIcon,
  SubscriptionsIcon,
} from '../../components/Icons/Icons'

const cb = classname.bind(style)

export default function SideBar() {
  const action = useContext(ActionSideBar)

  let btnSideBarAction = action.pathName1 === 'home' || action.pathName1 === ''
  // console.log('sidebar')

  return (
    <div id={cb('sidebar')}>
      <div className={cb('innerSidebar')}>
        <Link
          to={'/home'}
          className={cb('btnSidebar', btnSideBarAction && 'btnTop')}
        >
          <div className={cb('content-inline')}>
            <HomeIcon className={cb('bg-icon')} />
          </div>
          {action.state && (
            <div className={cb('content-inline')}>
              <span className={cb('style-text')}>Home</span>
            </div>
          )}
        </Link>
        <button className={cb('btnSidebar')}>
          <div className={cb('content-inline')}>
            <ShortIcon className={cb('bg-icon')} />
          </div>
          {action.state && (
            <div className={cb('content-inline')}>
              <span className={cb('style-text')}>Shorst</span>
            </div>
          )}
        </button>
        <button className={cb('btnSidebar')}>
          <div className={cb('content-inline')}>
            <SubscriptionsIcon className={cb('bg-icon')} />
          </div>
          {action.state && (
            <div className={cb('content-inline')}>
              <span className={cb('style-text')}>Subscriptions</span>
            </div>
          )}
        </button>
        <button className={cb('btnSidebar')}>
          <div className={cb('content-inline')}>
            <LibraryIcon className={cb('bg-icon')} />
          </div>
          {action.state && (
            <div className={cb('content-inline')}>
              <span className={cb('style-text')}>Library</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
