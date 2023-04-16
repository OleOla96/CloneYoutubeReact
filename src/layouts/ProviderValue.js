// import { useState, useRef, useEffect } from 'react'
import { createContext } from 'react'

const ActionSideBar = createContext()

function ProviderValue({ children }) {
  // const [state1, setState1] = useState(true)
  // const [pathName1, setPathName1] = useState('')
  // const [pathName2, setPathName2] = useState('')
  // const getPathname1 = useRef()
  // let updatePathname1 = window.location.pathname.split('/').pop()
  // let getPathname2 = window.location.pathname.split('/').slice(-2, -1)
  // console.log(pathName1)
  // console.log(typeof updatePathname1)
  // console.log(updatePathname1)

  // useEffect(() => {
  //   console.log(pathName1)

  //   getPathname1.current = window.location.pathname.split('/').pop()

  //   console.log(getPathname1.current)

  //   if (getPathname1.current === updatePathname1) {
  //     setPathName1(updatePathname1)
  //   }
  // }, [updatePathname1])

  // useEffect(() => {
  //   setPathName2(!pathName2)
  // }, [])

  // const handleState1 = () => {
  //   setState1(!state1)
  // }

  const value = {
    // state1,
    // handleState1,
    // pathName1,
    // pathName2,
  }

  return (
    <ActionSideBar.Provider value={value}>{children}</ActionSideBar.Provider>
  )
}

export { ActionSideBar, ProviderValue }
