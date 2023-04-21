import { createContext, useState, useEffect } from 'react'

const ActionSideBar = createContext()

function ProviderValue({ children }) {
  const [state1, setState1] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    setState1(window.innerWidth >= 1140)
  }, [width])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleState1 = () => {
    setState1(!state1)
  }

  const value = {
    state1,
    handleState1,
    width,
  }

  return (
    <ActionSideBar.Provider value={value}>{children}</ActionSideBar.Provider>
  )
}

export { ActionSideBar, ProviderValue }
