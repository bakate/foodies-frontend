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

const Reset = () => {
  const { login } = useInfos()
  const history = useHistory()
  const token = useParams().token
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    if (error) {
      const { hide } = cogoToast.error(error, {
        hideAfter: 6,
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
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        password: Yup.string().min(6, 'Au moins 6 caractères').required('mot de passe requis'),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Les mots de passe ne sont pas identiques'
        ),
      })}
      onSubmit={async ({ password, confirmPassword }) => {
        try {
          const { token: newToken, userId } = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/auth/reset/${token}`,
            'POST',
            JSON.stringify({
              password,
              confirmPassword,
            }),
            { 'Content-Type': 'application/json' }
          )
          cogoToast.success('Votre mot de passe a été réinitialisé !')
          login(userId, newToken)
          history.replace('/')
        } catch (err) {}
      }}>
      {({ isSubmitting, values }) => (
        <Flex justify='center' align='center' my='4rem'>
          <Form>
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <Heading as='h5' size='lg' fontWeight='semibold' py={3}>
              Créez un nouveau mot de passe
            </Heading>
            <InputField label='Mot de passe' name='password' type='password' />
            <InputField label='Confirmer' name='confirmPassword' type='password' />
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

export default Reset
