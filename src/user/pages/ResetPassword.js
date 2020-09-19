import { Button, Flex, Heading } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import InputField from '../../Chakra/InputField'
import Spinner from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const ResetPassword = () => {
  const { login } = useInfos()
  const history = useHistory()
  const token = useParams().token
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

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
    <Formik
      initialValues={{ password: '', confirmedPassword: '' }}
      validationSchema={Yup.object({
        password: Yup.string().min(6, 'Au moins 6 caractères').required('mot de passe requis'),
        confirmedPassword: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Les mots de passe ne sont pas identiques'
        ),
      })}
      onSubmit={async ({ password, confirmedPassword }) => {
        try {
          const { token: newToken, userId } = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/auth/resetpassword/${token}`,
            'POST',
            JSON.stringify({
              password,
              confirmedPassword,
            }),
            { 'Content-Type': 'application/json' }
          )
          cogoToast.success('Votre mot de passe a été réinitialisé !')
          login(userId, newToken)
          history.replace('/')
        } catch (err) {}
      }}>
      {({ isSubmitting }) => (
        <Flex justify='center' align='center' my='4rem'>
          <Form>
            <Heading as='h5' size='lg' fontWeight='semibold' py={3}>
              Créez un nouveau mot de passe
            </Heading>
            <InputField label='Mot de passe' name='password' type='password' />
            <InputField label='Confirmer' name='confirmedPassword' type='password' />
            <Button
              type='submit'
              mt={2}
              isLoading={isSubmitting}
              colorScheme='teal'
              loadingText='En Cours'>
              soumettre
            </Button>
          </Form>
        </Flex>
      )}
    </Formik>
  )
}

export default ResetPassword
