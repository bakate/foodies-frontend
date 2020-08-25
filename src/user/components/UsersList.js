import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { CardStyles } from '../../shared/components/UiElements/Card'
import UserItem from './UserItem'

export const UsersListStyles = styled(CardStyles)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0;
  place-content: center;
  place-items: center;
`

const UsersList = ({ users }) => {
  if (!users.length) {
    return (
      <UsersListStyles>
        <h2>No Users found</h2>
      </UsersListStyles>
    )
  }

  return (
    <ul>
      <UsersListStyles>
        {users.map((user) => (
          <UserItem key={user.id} {...user} />
        ))}
      </UsersListStyles>
    </ul>
  )
}

UsersList.propTypes = {
  users: PropTypes.array,
}

export default UsersList
