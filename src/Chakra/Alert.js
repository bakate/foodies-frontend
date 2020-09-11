import { Alert, AlertIcon } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const DisplayAlert = ({ status, message }) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      {message}
    </Alert>
  )
}

DisplayAlert.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

export default DisplayAlert
