import { Flex, Spinner } from '@chakra-ui/core'
import React from 'react'

const Loader = () => {
  return (
    <Flex justify='center' align='center' p={2}>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
    </Flex>
  )
}

export default Loader
