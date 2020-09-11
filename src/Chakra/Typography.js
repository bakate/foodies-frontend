import { Text } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const Typography = ({ text, children, ...rest }) => {
  return (
    <Text textAlign='center' {...rest}>
      {text}
      {children}
    </Text>
  )
}

Typography.propTypes = {
  text: PropTypes.string,
  children: PropTypes.any,
}

export default Typography
