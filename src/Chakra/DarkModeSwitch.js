import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/core'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

const DarkModeSwitch = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  return (
    <IconButton
      w='30px'
      h='30px'
      colorScheme='white'
      aria-label={`Switch to ${text} mode`}
      variant='ghost'
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  )
}

export default DarkModeSwitch
