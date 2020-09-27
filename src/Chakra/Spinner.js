import { Center, Spinner } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import Title from './Heading'

const DisplayLoader = ({ text, ...props }) => {
  return (
    <Center {...props}>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
      <Title title={text} pl={2} />
    </Center>
  )
}

DisplayLoader.propTypes = {
  text: PropTypes.string,
}

export default DisplayLoader
