import { Box, Button, ButtonGroup, Center, Divider, Flex, Heading, Text } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import * as Yup from 'yup'
import InputField from '../../Chakra/InputField'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import AuthWithFacebook from '../pages/AuthWithFacebook'
import AuthWithGoogle from '../pages/AuthWithGoogle'
import ResetToken from '../pages/ForgotPassword'
const AuthForm = () => {
  const { sendRequest, error, clearError } = useHttpClient()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(!isOpen)
  const { login } = useInfos()
  const [inLogInMode, setInLogInMode] = useState(true)

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

  return (
    <>
      <Box
        maxW={{ md: '550px' }}
        bgColor='white'
        px={3}
        boxShadow='lg'
        borderRadius='md'
        m={{ base: '2rem 0', md: '4rem 0' }}>
        <ResetToken isOpen={isOpen} onClose={onClose} />
        <Formik
          initialValues={{ email: '', password: '', username: '' }}
          validationSchema={Yup.object({
            username: Yup.string().min(6, 'Au moins 6 caractères').optional(),
            email: Yup.string().email('email invalide').required('Email requis.'),
            password: Yup.string().min(6, 'Au moins 6 caractères').required('mot de passe requis'),
          })}
          onSubmit={async ({ email, password, username }) => {
            if (inLogInMode) {
              try {
                const { userId, token, username } = await sendRequest(
                  `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
                  'POST',
                  JSON.stringify({
                    email,
                    password,
                  }),
                  { 'Content-Type': 'application/json' }
                )
                cogoToast.success(`Ravi de vous revoir ${username} !`, { hideAfter: 5 })
                login(userId, token)
              } catch (err) {}
            } else {
              try {
                const { token, userId, username: name } = await sendRequest(
                  `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
                  'POST',
                  JSON.stringify({
                    username,
                    email,
                    password,
                  }),
                  { 'Content-Type': 'application/json' }
                )
                cogoToast.success(`Bienvenue ${name} !`, { hideAfter: 5 })
                login(userId, token)
              } catch (err) {}
            }
          }}>
          {({ isSubmitting }) => (
            <Form>
              {inLogInMode && (
                <Heading as='h5' size='md' fontWeight='normal' py={3}>
                  Se connecter &agrave; Foodies
                </Heading>
              )}
              {!inLogInMode && (
                <Heading as='h5' size='md' pt={2}>
                  Cr&eacute;ez un compte Foodies
                </Heading>
              )}
              {!inLogInMode && (
                <Heading as='h5' size='sm' fontWeight='normal' py={2}>
                  C'est rapide et facile
                </Heading>
              )}

              <ButtonGroup d='flex' justify='space-evenly' wrap='wrap'>
                <AuthWithGoogle />
                <AuthWithFacebook />
              </ButtonGroup>
              <Center height='50px'>
                <Divider />
                <Text mx={2}>ou</Text>
                <Divider />
              </Center>
              {!inLogInMode && (
                <InputField id='username' name='username' placeholder="nom d'utilisateur" />
              )}
              <InputField id='email' name='email' placeholder='votre email' />
              <InputField
                id='password'
                name='password'
                type='password'
                placeholder='votre mot de passe'
              />
              {inLogInMode && (
                <Button
                  my={3}
                  colorScheme='blue'
                  isLoading={isSubmitting}
                  loadingText='En Cours'
                  w='100%'
                  type='submit'>
                  Connexion
                </Button>
              )}
              {!inLogInMode && (
                <Flex my={3} justify='space-between' align='center'>
                  <Button
                    onClick={() => setInLogInMode(!inLogInMode)}
                    variant='outline'
                    leftIcon={<FaArrowLeft />}
                    colorScheme='teal'>
                    Se connecter ?
                  </Button>
                  <Button
                    type='submit'
                    variant='solid'
                    colorScheme='teal'
                    loadingText='En Cours'
                    isLoading={isSubmitting}>
                    S'inscrire
                  </Button>
                </Flex>
              )}

              {inLogInMode && (
                <Center>
                  <Button
                    // to='/resetpassword'
                    variant='link'
                    pt={1}
                    fontSize='14px'
                    onClick={onOpen}
                    _hover={{ color: 'blue.400' }}>
                    Mot de passe oubli&eacute; ?
                  </Button>
                </Center>
              )}
              {inLogInMode && (
                <Center height='50px'>
                  <Divider />
                  <Text mx={2}>sinon</Text>
                  <Divider />
                </Center>
              )}
              {inLogInMode && (
                <Center mb={2}>
                  <Button
                    variant='solid'
                    colorScheme='teal'
                    onClick={() => setInLogInMode(!inLogInMode)}>
                    Cr&eacute;er un compte
                  </Button>
                </Center>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}

export default AuthForm
