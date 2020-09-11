import { Box } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const Hamburger = ({ onClick, btnRef }) => {
  return (
    <Box
      display={{ base: 'flex', sm: 'none' }}
      ref={btnRef}
      onClick={onClick}
      pr={{ base: 0 }}
      cursor='pointer'>
      <svg fill='orange' width='34px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
        <title>Menu</title>
        <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
      </svg>
    </Box>
  )
}

Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Hamburger
