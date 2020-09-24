import { Grid } from '@chakra-ui/core'
import React from 'react'
import Title from '../../Chakra/Heading'
import AuthForm from '../components/AuthForm'

const Auth = () => (
  <>
    <Grid
      w='100%'
      h='100vh'
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      justifyContent='space-between'
      alignItems='center'
      alignContent='center'>
      <Title title='foodies, créez et partagez vos meilleures recettes. ' />
      <AuthForm />
    </Grid>
  </>
)

export default Auth
