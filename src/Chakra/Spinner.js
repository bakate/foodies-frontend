import { Center, Spinner } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const DisplayLoader = ({ ...props }) => {
  return (
    <Center {...props}>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
    </Center>
  )
}

DisplayLoader.propTypes = {
  text: PropTypes.string,
}

export default DisplayLoader
