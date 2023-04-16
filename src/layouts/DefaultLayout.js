import classname from 'classnames/bind'
import style from './defaultLayout.module.scss'
import Header from './Header/Header'

const cb = classname.bind(style)

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className={cb('container')}>{children}</div>
    </>
  )
}

export default DefaultLayout
