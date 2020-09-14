import { Box, Center, Flex, IconButton, useColorModeValue } from '@chakra-ui/core'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { Link as ReachLink, useHistory } from 'react-router-dom'
import { useInfos } from '../shared/context'
import DarkModeSwitch from './DarkModeSwitch'
import Drawer from './Drawer'
import Title from './Heading'
import NavLinks from './NavLinks'

const Header = () => {
  const history = useHistory()
  const { token, logout } = useInfos()
  const logoutHandler = () => {
    logout()
    history.replace('/')
  }

  const bg = useColorModeValue('orange.500', 'orange.200')
  const color = useColorModeValue('white', 'gray.800')
  return (
    <Flex as='nav' align='center' justify='space-between' color={color} bg={bg} px={6} py={4}>
      <Center>
        <Title title='foodies' as={ReachLink} to='/' />
      </Center>

      <Box d={{ base: 'none', md: 'flex' }} align='center' justify='center'>
        <NavLinks />
      </Box>

      <Center>
        {!!token && (
          <IconButton
            d={['none', 'inline-block']}
            icon={<FiLogOut />}
            onClick={logoutHandler}
            alignSelf='center'
            variant='ghost'
            colorScheme='white'
            w='28px'
            h='28px'
          />
        )}
        <DarkModeSwitch />
        <Drawer body={<NavLinks />} />
      </Center>
    </Flex>
  )
}
export default Header
