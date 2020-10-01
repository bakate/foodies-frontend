import cogoToast from 'cogo-toast'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const InfosContext = createContext()

const InfosProvider = InfosContext.Provider

const MamaProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null)
  const [userRecipes, setUserRecipes] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState()
  const [allRecipes, setAllRecipes] = useState([])
  const login = useCallback((uid, token, expirationDate) => {
    setUserId(uid)
    setToken(token)
    const setNewDate = expirationDate || new Date(new Date().getTime() + 3600000)
    setTokenExpirationDate(setNewDate)
    localStorage.setItem(
      'newUser',
      JSON.stringify({ user: uid, token, expiration: setNewDate.toISOString() })
    )
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setTokenExpirationDate(null)
    localStorage.removeItem('newUser')

    cogoToast.success('A très vite !')
  }, [])

  useEffect(() => {
    const isThereSomeOne = JSON.parse(localStorage.getItem('newUser'))
    if (
      isThereSomeOne?.token &&
      new Date(isThereSomeOne.expiration) > new Date()
    ) {
      const { token, user, expiration } = isThereSomeOne
      login(user, token, new Date(expiration))
    }
  }, [login])

  useEffect(() => {
    let logoutTimer
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [tokenExpirationDate, logout, token])

  return (
    <InfosProvider
      value={{
        token,
        logout,
        login,
        userId,
        setIsOpen,
        userRecipes,
        setUserRecipes,
        isOpen,
        onClose,
        page,
        query,
        setQuery,
        allRecipes,
        setAllRecipes,
        setPage,
      }}>
      {children}
    </InfosProvider>
  )
}

const useInfos = () => {
  return useContext(InfosContext)
}

export { MamaProvider, useInfos }

