import { Box, Flex, IconButton, useColorModeValue } from '@chakra-ui/core'
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
    <Flex as='nav' align='center' justify='space-between' color={color} bg={bg} px={4}>
      <Title title='foodies' px={{ base: 0, md: '4' }} mb={{ md: '2' }} />

      <Box d={{ base: 'none', md: 'flex' }} ml='auto' align='center' justify='center'>
        <NavLinks />
      </Box>

      {!!token && (
        <IconButton
          icon={<FiLogOut />}
          onClick={logout}
          alignSelf='center'
          variant='outline'
          w='25px'
          h='25px'
          ml='auto'
        />
      )}
      <DarkModeSwitch justifySelf='flex-end' mr={6} />
      <Drawer body={<NavLinks />} />
    </Flex>
  )
}
export default Header
