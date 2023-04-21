import PropTypes from 'prop-types';
import classname from 'classnames/bind'
import style from './defaultLayout.module.scss'
import Header from './Header/Header'

const cb = classname.bind(style)

function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className={cb('container')}>
        <div className={cb('content')}>{children}</div>
      </div>
    </div>
  )
}

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired,
  }

export default HeaderOnly
