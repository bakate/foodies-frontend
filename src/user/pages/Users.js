import cogoToast from 'cogo-toast'
import React, { useEffect } from 'react'
import Title from '../../Chakra/Heading'
import Spinner from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import UsersList from '../components/UsersList'

const Users = () => {
  const { sendRequest, isLoading, error } = useHttpClient()
  const { userRecipes, setUserRecipes } = useInfos()

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { users } = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/auth`)
        setUserRecipes(users)
      } catch (err) {}
    }
    getUsers()
  }, [sendRequest, setUserRecipes])

  useEffect(() => {
    if (error) {
      const { hide } = cogoToast.error(error, {
        hideAfter: 6,
        onClick: () => {
          hide()
        },
      })
    }
  }, [error])
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Title title='nos meilleurs contributeurs' />

      <UsersList users={userRecipes} />
    </>
  )
}

export default Users
