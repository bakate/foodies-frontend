import { Box } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
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
  const { token, userId } = useInfos()

  return (
    <>
      <LinkGenerator href='/' title='les recettes' />
      {!!token && <LinkGenerator href={`/${userId}/recipes`} title='mes recettes' />}
      {!!token && <LinkGenerator href='/recipes/new' title='cr&eacute;er une recette' />}
      {/* {!token && <LinkGenerator href='/users' title='nos chefs' />} */}
      {!token && <LinkGenerator href='/auth' title='connexion' />}
      {!!token && <LinkGenerator href={`/profile/${userId}`} title='mon profil' />}

      {/* </Flex> */}
    </>
  )
}

LinkGenerator.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default NavLinks
