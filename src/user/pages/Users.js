import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../shared/components/UiElements/ErrorMessage'
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import UsersList from '../components/UsersList'

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [newUsers, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const { users } = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/auth`)
      setUsers(users)
    }
    getUsers()
  }, [sendRequest])

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    )
  }
  if (error) {
    return <ErrorMessage errorMessage={error} onClear={clearError} />
  }
  return <UsersList users={newUsers} />
}

export default Users
