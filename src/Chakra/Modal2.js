import {
  Button,
  ButtonGroup,
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

const DisplayModal2 = ({ isOpen, onClose }) => {
  const { setIsOpen } = useInfos()
  const { sendRequest } = useHttpClient()
  const initialRef = useRef()
  const finalRef = useRef()
  return (
    <Formik
      initialValues={{ duration: '', ingredients: '', cooking: '' }}
      validationSchema={Yup.object({
        ingredients: Yup.string().min(6, 'Au moins 6 caractères'),
        duration: Yup.string().min('duration est invalide').required('duration requis.'),
        cooking: Yup.string().min(6, 'Au moins 6 caractères').required('mot de passe requis'),
      })}
      onSubmit={async ({ duration, cooking, ingredients }, actions) => {
        try {
          const { userId, token } = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
            'POST',
            JSON.stringify({
              duration,
              cooking,
              ingredients,
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
                  <InputField name='duration' placeholder='duration' label='durée' />
                  <InputField
                    name='cooking'
                    type='cooking'
                    placeholder='cooking'
                    label='preparation'
                  />
                  <InputField name='ingredients' placeholder='ingredients' label='Ingrédients' />
                </ModalBody>

                <ModalFooter>
                  <ButtonGroup>
                    <Button colorScheme='blue' type='submit' mr={3}>
                      valider
                    </Button>
                    <Button onClick={() => setIsOpen(true)}>Précédent</Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ButtonGroup>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </Form>
      )}
    </Formik>
  )
}

export default DisplayModal2
