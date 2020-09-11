import { Button, ButtonGroup, Center } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import Title from '../../Chakra/Heading'
import InputField from '../../Chakra/InputField'
import Spinner from '../../Chakra/Spinner'
import Imagehandler from '../../shared/components/FormElements/ImageHandler'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const UpdateProfile = () => {
  const [userProfile, setUserProfile] = useState()
  const userId = useParams().userId
  const { isLoading, error, sendRequest } = useHttpClient()
  const { token } = useInfos()
  const history = useHistory()

  useEffect(() => {
    const getUserInfos = async () => {
      try {
        const {
          user: { username, images },
        } = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/auth/profile/${userId}`)

        setUserProfile({ username, images })
      } catch (err) {}
    }
    getUserInfos()
  }, [sendRequest, userId, token])

  useEffect(() => {
    if (error) {
      const { hide } = cogoToast.error(error, {
        hideAfter: 6,
        onClick: () => {
          hide()
        },
      })
    }
  }, [error])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <Formik
        initialValues={{ userProfile }}
        validationSchema={Yup.object({
          username: Yup.string().min(6, 'Au moins 6 caractères'),
          images: Yup.string().required('Image requise.'),
        })}
        onSubmit={async ({ username, images }, actions) => {
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/auth/profile/update/${userId}`,
              'PATCH',
              JSON.stringify({
                username,
                images,
              }),
              { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            )
            history.replace(`/${userId}/recipes`)
            cogoToast.success('Profil à jour !')
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
                    id='images'
                    boxSize='180px'
                    initialValue={userProfile.images.regularImage}
                    alt='user profile'
                  />
                  <InputField
                    id='username'
                    name='username'
                    defaultValue={userProfile.username}
                    label="Nom d'utilisateur :"
                  />
                  <ButtonGroup variant='outline' my={3}>
                    <Button>Annuler</Button>
                    <Button
                      colorScheme='teal'
                      variant='solid'
                      isLoading={isSubmitting}
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
