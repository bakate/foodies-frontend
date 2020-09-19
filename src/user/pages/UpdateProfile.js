import { Button, ButtonGroup, Center } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import Title from '../../Chakra/Heading'
import Imagehandler from '../../Chakra/ImageHandler'
import InputField from '../../Chakra/InputField'
import Spinner from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const UpdateProfile = () => {
  const [userProfile, setUserProfile] = useState()

  const userId = useParams().userId
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { token } = useInfos()
  const history = useHistory()

  useEffect(() => {
    const getUserInfos = async () => {
      try {
        const {
          user: { username, avatar },
        } = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/auth/profile/${userId}`)

        setUserProfile({ username, avatar })
      } catch (err) {}
    }
    getUserInfos()
  }, [sendRequest, userId, token])

  useEffect(() => {
    if (error) {
      const { hide } = cogoToast.error(error, {
        hideAfter: 4,
        onClick: () => {
          hide()
        },
      })
    }
    return () => {
      return clearError()
    }
  }, [error, clearError])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <Formik
        initialValues={userProfile}
        enableReinitialize='true'
        validationSchema={Yup.object({
          username: Yup.string().min(6, 'Au moins 6 caractères'),
          avatar: Yup.string().optional('Nouvelle photo ?'),
        })}
        onSubmit={async ({ username, avatar }) => {
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/auth/profile/update/${userId}`,
              'PATCH',
              JSON.stringify({
                username,
                avatar,
              }),
              { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            )
            history.replace(`/${userId}/recipes`)
            cogoToast.success('Votre Profil est à jour !')
          } catch (err) {}
        }}>
        {({ isSubmitting }) => (
          <Center pb={8}>
            <Form>
              <Title title='mes informations' />
              {!isLoading && userProfile && (
                <>
                  <Imagehandler
                    borderRadius='full'
                    name='avatar'
                    id='avatar'
                    boxSize='180px'
                    initialValue={userProfile.avatar}
                    alt='user profile'
                  />
                  <InputField name='username' label="Nom d'utilisateur :" />
                  <ButtonGroup variant='outline' my={3} d='flex' justifyContent='center'>
                    <Button onClick={() => history.goBack()}>Annuler</Button>
                    <Button
                      colorScheme='teal'
                      variant='solid'
                      isLoading={isSubmitting}
                      loadingText='En Cours ...'
                      type='submit'>
                      Modifier
                    </Button>
                  </ButtonGroup>
                </>
              )}
            </Form>
          </Center>
        )}
      </Formik>
    </>
  )
}

/* {!isLoading && userProfile && (
         <div>
           <AuthStyles>
             <form onSubmit={authHandler}>
               <ImageHandler
                 id='images'
                 onInput={inputHandler}
                 initialValue={userProfile.images.regularImage}
               />
               <Input
                 id='username'
                 placeholder="nom d'utilisateur"
                 label="nom d'utilisateur"
                 initialValid
                 initialValue={userProfile.username}
                 errorText="Renseignez un nom d'utilisateur"
                 validators={[VALIDATOR_REQUIRE()]}
                 onInput={inputHandler}
               /
               <Button type='submit' disabled={!formState.isValid || isLoading}>
                 soumettre
               </Button>
             </form>
           </AuthStyles>
         </div>
       )}
     </> */

export default UpdateProfile
