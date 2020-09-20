import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Slide,
  SlideFade
} from '@chakra-ui/core'
import React, { useRef } from 'react'

const DisplayAlertDialog = ({ isOpen, onClose, body, header, onDeleteHandler }) => {
  const cancelRef = useRef()
  return (
    <Slide timeout={300} in={isOpen}>
      {(styles) => (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
          <AlertDialogOverlay>
            <SlideFade timeout={150} in={isOpen} unmountOnExit={false}>
              {(styles) => (
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    {header}
                  </AlertDialogHeader>

                  <AlertDialogBody>{body}</AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Annuler
                    </Button>
                    <Button
                      colorScheme='red'
                      onClick={() => {
                        onDeleteHandler()
                        onClose()
                      }}
                      ml={3}>
                      Supprimer
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </SlideFade>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Slide>
  )
}

export default DisplayAlertDialog
