import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const AvatarStyles = styled.div`
  width: 100%;
  height: 100%;
  /* display: flex;
  place-content: center;
  place-items: center; */

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    /* display: block; */
    object-fit: cover;
  }
`

const Avatar = ({ image, alt }) => {
  return (
    <AvatarStyles>
      <img src={image} alt={alt} />
    </AvatarStyles>
  )
}

Avatar.propTypes = {
  alt: PropTypes.string,
  image: PropTypes.string,
}

export default Avatar
