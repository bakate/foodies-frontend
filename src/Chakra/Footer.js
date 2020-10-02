import { Center, useColorModeValue } from '@chakra-ui/core'
import React from 'react'
import Typography from './Typography'

const Footer = () => {
  const bg = useColorModeValue('orange.500', 'orange.200')
  const color = useColorModeValue('white', 'gray.800')
  return (
    <Center color={color} bg={bg} py={6}>
      <Typography text='Made with ❤ in Paris' />
    </Center>
  )
}

export default Footer
