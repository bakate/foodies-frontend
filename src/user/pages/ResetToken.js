import { Button } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import { Formik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import InputField from '../../Chakra/InputField'
import SimpleModal from '../../Chakra/SimpleModal'
import Spinner from '../../Chakra/Spinner'
import { useHttpClient } from '../../shared/hooks/http-hook'

const ResetToken = ({ isOpen, onClose }) => {
  const history = useHistory()
  const initialRef = useRef()
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
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('email invalide').required('Email requis.'),
      })}
      onSubmit={async ({ email }) => {
        try {
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/auth/reset`,
            'POST',
            JSON.stringify({
              email,
            }),
            { 'Content-Type': 'application/json' }
          )
          cogoToast.info('Vérifier votre boite mail !')
          history.replace('/')
        } catch (err) {}
      }}>
      {({ isSubmitting, isLoading }) => (
        <>
          <pre>{JSON.stringify(isLoading, null, 2)}</pre>
          <SimpleModal
            isOpen={isOpen}
            onClose={onClose}
            initialRef={initialRef}
            modalHeader='Réinitialisez votre mot de passe'
            modalBody={<InputField name='email' label='Email' placeholder='votre email' />}
            modalFooter={
              <Button
                type='submit'
                isLoading={isSubmitting}
                colorScheme='teal'
                loadingText='En Cours'>
                soumettre
              </Button>
            }
          />
        </>
      )}
    </Formik>
  )
}

export default ResetToken
