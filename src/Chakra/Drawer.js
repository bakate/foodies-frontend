import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'

const DisplayDrawer = ({ body, ...rest }) => {
  const btnRef = useRef(null)
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Box
        display={{ base: 'block', md: 'none' }}
        ref={btnRef}
        alignSelf='center'
        onClick={onOpen}
        cursor='pointer'
        {...rest}>
        <svg
          fill='orange'
          width='25px'
          h='25px'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'>
          <title>Menu</title>
          <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
        </svg>
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} placement='left'>
        <DrawerBody>
          <DrawerOverlay />
          <DrawerContent bg='orange.500' borderColor='orange.800' color='white'>
            <DrawerCloseButton />
            <DrawerHeader textAlign='center'>Foodies</DrawerHeader>
            <DrawerBody onClick={onClose}>{body}</DrawerBody>
          </DrawerContent>
        </DrawerBody>
      </Drawer>
    </>
  )
}

DisplayDrawer.propTypes = {
  body: PropTypes.any,
}

export default DisplayDrawer
