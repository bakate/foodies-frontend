import { Grid } from '@chakra-ui/core'
import React from 'react'
import styled from 'styled-components'
import Title from '../../Chakra/Heading'
import { CardStyles } from '../../shared/components/UiElements/Card'
import AuthForm from '../components/AuthForm'

export const AuthStyles = styled(CardStyles)`
  width: 100%;
  max-width: 50rem;
  margin: 1rem auto;
  padding-top: 0;
`

const Auth = () => {
  return (
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
}

export default Auth
