import classname from 'classnames/bind'
import { useContext } from 'react'
import { ActionSideBar } from '../ProviderValue'
import SidebarItem from './SidebarItem'
import SidebarItemMini from './SidebarItemMini'
import styles from './Sidebar.module.scss'
import {
  HomeIcon,
  HomeActiveIcon,
  ShortIcon,
  ShortActiveIcon,
  LibraryIcon,
  LibraryActiveIcon,
  SubscriptionsIcon,
  SubscriptionsActiveIcon,
} from '../../components/Icons'

const cb = classname.bind(styles)

export default function Sidebar() {
  const sidebar = useContext(ActionSideBar)

  return (
    <div className={cb('container')}>
      {sidebar.state1 ? (
        <>
          <SidebarItem
            title='Home'
            to={'/'}
            icon={<HomeIcon />}
            activeIcon={<HomeActiveIcon />}
          />
          <SidebarItem
            title='Shorts'
            to={'/shorst'}
            icon={<ShortIcon />}
            activeIcon={<ShortActiveIcon />}
          />
          <SidebarItem
            title='Subscriptions'
            to={'/subscriptions'}
            icon={<SubscriptionsIcon />}
            activeIcon={<SubscriptionsActiveIcon />}
          />
          <SidebarItem
            title='Library'
            to={'/library'}
            icon={<LibraryIcon />}
            activeIcon={<LibraryActiveIcon />}
          />
        </>
      ) : (
        <>
          <SidebarItemMini
            title='Home'
            to={'/'}
            icon={<HomeIcon />}
            activeIcon={<HomeActiveIcon />}
          />
          <SidebarItemMini
            title='Shorts'
            to={'/shorst'}
            icon={<ShortIcon />}
            activeIcon={<ShortActiveIcon />}
          />
          <SidebarItemMini
            title='Subscriptions'
            to={'/subscriptions'}
            icon={<SubscriptionsIcon />}
            activeIcon={<SubscriptionsActiveIcon />}
          />
          <SidebarItemMini
            title='Library'
            to={'/library'}
            icon={<LibraryIcon />}
            activeIcon={<LibraryActiveIcon />}
          />
        </>
      )}
    </div>
  )
}
