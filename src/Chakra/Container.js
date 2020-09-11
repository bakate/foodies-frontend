import { ColorModeScript, Stack, useColorMode } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const Container = ({ children }) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.200', dark: 'gray.900' }
  const color = { light: 'gray.500', dark: 'white' }

  return (
    <Stack
      direction='column'
      color={color[colorMode] || color.light}
      bg={bgColor[colorMode] || bgColor.light}
      p='0 2rem'
      mx='auto'
      spacing={1}>
      <ColorModeScript />
      {children}
    </Stack>
  )
}
Container.propTypes = {
  children: PropTypes.any,
}

export default Container
