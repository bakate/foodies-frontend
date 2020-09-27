import { Stack, useColorModeValue } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const Container = ({ children }) => {
  const bgColor = useColorModeValue('gray.200', 'gray.900')
  const color = useColorModeValue('gray.500', 'white')
  return (
    <Stack
      direction='column'
      overflow='hidden'
      minH='100vh'
      color={color}
      bg={bgColor}
      p='1rem 2rem'
      mx='auto'
      spacing={1}>
      {children}
    </Stack>
  )
}
Container.propTypes = {
  children: PropTypes.any,
}

export default Container
