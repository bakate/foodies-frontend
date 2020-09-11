import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/core'
// import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

const MenuItems = () => {
  const router = useRouter()
  return (
    <Box>
      <Menu>
        <MenuButton
          backgroundColor='black'
          color='white'
          as={Button}
          // opacity={router.pathname !== '/activite' ? 0.5 : 1}
          textTransform='uppercase'
          px={4}
          py={2}
          transition='all 0.2s'
          rounded='md'
          borderWidth='1px'
          rightIcon='chevron-down'
          fontWeight='bold'
          // bg={bgColor[colorMode]}
          // color={textColor[colorMode]}
          // opacity=".5"
          _hover={{ bg: 'gray.100', color: 'black' }}
          _expanded={{ bg: 'red.200' }}
          // _focus={{ outline: 0, boxShadow: 'outline' }}
        >
          CLUBELEC
        </MenuButton>
        <MenuList cursor='pointer' backgroundColor='white' color='black'>
          <MenuItem>
            {/* <Link href="/activite"> */}
            {/* <a>&Agrave; Propos de Nous</a>
            </Link> */}
          </MenuItem>
          {/* <Link href="/activite"> */}
          <MenuItem as='a'>Activit&eacute;s</MenuItem>
          {/* </Link> */}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default MenuItems
