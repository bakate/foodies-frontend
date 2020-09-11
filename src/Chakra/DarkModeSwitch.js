import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/core'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

const DarkModeSwitch = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  return (
    <IconButton
      w='40px'
      h='40px'
      fontSize='lg'
      mr={3}
      aria-label={`Switch to ${text} mode`}
      variant='ghost'
      color='current'
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  )
}

export default DarkModeSwitch
