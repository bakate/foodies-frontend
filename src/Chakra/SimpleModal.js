import {
  Fade,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/core'
import { Form } from 'formik'
import React from 'react'

const SimpleModal = ({
  isOpen,
  initialRef,
  onClose,
  progressBar,
  modalHeader,
  modalBody,
  modalFooter,
}) => {
  return (
    <Fade timeout={300} in={isOpen}>
      {(styles) => (
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay>
            <ModalContent>
              <Form>
                {progressBar}
                <ModalHeader>{modalHeader}</ModalHeader>

                <ModalCloseButton />

                <ModalBody pb={6}>{modalBody}</ModalBody>

                <ModalFooter>{modalFooter}</ModalFooter>
              </Form>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </Fade>
  )
}

export default SimpleModal
