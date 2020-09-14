import { Box, ButtonGroup, Flex, IconButton, useColorModeValue } from '@chakra-ui/core'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useInfos } from '../shared/context'
import DarkModeSwitch from './DarkModeSwitch'
import Drawer from './Drawer'
import Title from './Heading'
import NavLinks from './NavLinks'

const Header = () => {
  const { token, logout } = useInfos()

  const bg = useColorModeValue('orange.500', 'orange.200')
  const color = useColorModeValue('white', 'gray.800')
  return (
    <Flex as='nav' align='center' justify='space-between' color={color} bg={bg} px={6}>
      <Title title='foodies' px={{ md: '4' }} />

      <Box d={{ base: 'none', md: 'flex' }} align='center' justify='center'>
        <NavLinks />
      </Box>

      <ButtonGroup>
        {!!token && (
          <IconButton
            icon={<FiLogOut />}
            onClick={logout}
            alignSelf='center'
            variant='ghost'
            colorScheme='white'
            w='30px'
            h='30px'
          />
        )}
        <DarkModeSwitch />
        <Drawer body={<NavLinks />} />
      </ButtonGroup>
    </Flex>
  )
}
export default Header
