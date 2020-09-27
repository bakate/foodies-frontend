import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/core'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

const DarkModeSwitch = (props) => {
  const { toggleColorMode = 'light' } = useColorMode()
  const text = useColorModeValue('light', 'dark')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  return (
    <IconButton
      w='28px'
      h='28px'
      colorScheme='white'
      aria-label={`Switch to ${text} mode`}
      variant='ghost'
      _focus={{ outline: 'none' }}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  )
}

export default DarkModeSwitch
