import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'

const cb = classNames.bind(styles)

function SidebarItem({ title, to, icon, activeIcon }) {
  return (
    <NavLink
      to={to}
      className={(e) => cb('btnSidebar', { active: e.isActive })}
    >
      <span className={cb('icon')}>{icon}</span>
      <span className={cb('active-icon')}>{activeIcon}</span>
      <span className={cb('title')}>{title}</span>
    </NavLink>
  )
}

SidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
}

export default SidebarItem
