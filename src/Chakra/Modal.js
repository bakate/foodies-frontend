import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import { Form, Formik } from 'formik'
import React, { useRef } from 'react'
import * as Yup from 'yup'
import { useInfos } from '../shared/context'
import { useHttpClient } from '../shared/hooks/http-hook'
import InputField from './InputField'
import DisplayModal2 from './Modal2'

const DisplayModal = ({ isOpen, onClose }) => {
  const { setIsOpenTwo, onCloseTwo, isOpenTwo } = useInfos()

  const { sendRequest } = useHttpClient()
  const initialRef = useRef()
  const finalRef = useRef()
  return (
    <>
      <DisplayModal2 isOpen={isOpenTwo} onClose={onCloseTwo} />
      <Formik
        initialValues={{ email: '', password: '', username: '' }}
        validationSchema={Yup.object({
          username: Yup.string().min(6, 'Au moins 6 caractères'),
          email: Yup.string().email('email invalide').required('Email requis.'),
          password: Yup.string().min(6, 'Au moins 6 caractères').required('mot de passe requis'),
        })}
        onSubmit={async ({ email, password, username }, actions) => {
          try {
            const { userId, token } = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
              'POST',
              JSON.stringify({
                email,
                password,
              }),
              { 'Content-Type': 'application/json' }
            )
            cogoToast.success('Ravi de vous revoir !')
          } catch (err) {}
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
              isCentered>
              <ModalOverlay>
                <ModalContent>
                  <ModalHeader>Cr&eacute;er votre Recette</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <InputField name='email' placeholder='email' label='titre' />
                    <InputField
                      name='password'
                      type='password'
                      placeholder='password'
                      label='ingrédients'
                    />
                    <InputField name='username' placeholder='username' label='Préparation' />
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme='blue'
                      onClick={() => {
                        setIsOpenTwo(true)
                      }}
                      mr={3}>
                      Suivant
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </ModalOverlay>
            </Modal>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default DisplayModal
