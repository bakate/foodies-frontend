import { Grid } from '@chakra-ui/core'
import React from 'react'
import Title from '../../Chakra/Heading'
import AuthForm from '../components/AuthForm'

const Auth = (props) => {
  // const token = useParams().token
  // console.log(token)
  // useEffect(() => {
  //   const query = queryString.parse(props.location.search)
  //   if (query.token) {
  //     console.log({ token: query.token })
  //     window.localStorage.setItem('jwt', query.token)
  //     history.push('/profile')
  //   }
  // }, [props.location.search, history])
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
