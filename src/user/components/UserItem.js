import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Avatar from '../../shared/components/UiElements/Avatar'
import { CardStyles } from '../../shared/components/UiElements/Card'

const UserItemStyles = styled(CardStyles)`
  /* display: flex; */
  /* flex-flow: column wrap; */
  width: 100%;
  padding: 0;

  a {
    display: grid;
    align-items: space-between;
    justify-content: center;

    padding: 1rem;
    color: ${({ theme }) => theme.black};
    background: ${({ theme }) => theme.primaryLight};
    &:hover,
    &:active {
      background: ${({ theme }) => theme.primaryDark};
      color: ${({ theme }) => theme.black};
    }
  }
  .avatar {
    width: 10rem;
    height: 10rem;
  }
`

const UserItem = ({ id, username, images, recipes }) => {
  return (
    <UserItemStyles>
      <Link to={`/${id}/recipes`}>
        <div className='avatar'>
          <Avatar image={images && images.regularImage} alt='user profile' />
        </div>
        <h2>{username}</h2>
        <h3>
          {recipes.length} {` recette${recipes.length <= 1 ? '' : 's'}`}
        </h3>
      </Link>
    </UserItemStyles>
  )
}

UserItem.propTypes = {
  id: PropTypes.string,
  images: PropTypes.shape({
    regularImage: PropTypes.string,
  }),
  recipes: PropTypes.array,
  username: PropTypes.string,
}

export default UserItem
