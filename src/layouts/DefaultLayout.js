import PropTypes from 'prop-types'
import classname from 'classnames/bind'
import style from './defaultLayout.module.scss'
import Header2 from './Header/Header2'
import Sidebar from './Sidebar'

const cb = classname.bind(style)

function DefaultLayout({ children }) {
  return (
    <>
      <Header2 />
      <div className={cb('container')}>
        <Sidebar />
        <div className={cb('content')}>{children}</div>
      </div>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
