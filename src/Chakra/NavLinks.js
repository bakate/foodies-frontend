import { Box, Button } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useInfos } from '../shared/context'

const LinkGenerator = ({ href, title }) => {
  return (
    <Box
      fontWeight='bold'
      cursor='pointer'
      textTransform='uppercase'
      p={2}
      _hover={{ borderBottom: '2px solid orange' }}>
      <NavLink to={href}>{title}</NavLink>
    </Box>
  )
}

const NavLinks = () => {
  const history = useHistory()
  const { token, userId, logout } = useInfos()
  const logoutHandler = () => {
    logout()
    history.replace('/')
  }

  return (
    <>
      <LinkGenerator href='/' title='les recettes' />
      {!!token && <LinkGenerator href={`/${userId}/recipes`} title='mes recettes' />}
      {!token && <LinkGenerator href='/auth' title='connexion' />}
      {!!token && <LinkGenerator href={`/profile/${userId}`} title='mon profil' />}
      {!!token && (
        <Button
          d={['block', 'none']}
          onClick={logoutHandler}
          p={2}
          fontWeight='bold'
          variant='link'
          _hover={{ borderBottom: '2px solid orange' }}
          textTransform='uppercase'
          colorScheme='white'>
          Deconnexion
        </Button>
      )}
    </>
  )
}

LinkGenerator.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default NavLinks
