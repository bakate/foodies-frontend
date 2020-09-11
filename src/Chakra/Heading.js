import { Box, Center } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const Title = ({ title, ...rest }) => {
  return (
    <Center>
      <Box textStyle={`h2`} {...rest} mb={2}>
        {title}
      </Box>
    </Center>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Title
