import { Box, Image, PseudoBox } from '@chakra-ui/core'
// import Link from 'next/link';
import React from 'react'

const Logo = () => (
  <PseudoBox _hover={{ cursor: 'pointer' }}>
    {/* <Link href="/"> */}
    <Box>
      <Image
        src='/logo.png'
        objectFit='cover'
        size='60px'
        height={{ base: '100px', lg: '150px' }}
        width={{ base: '100%', md: '80%' }}
      />
    </Box>
    {/* </Link> */}
  </PseudoBox>
)

export default Logo
