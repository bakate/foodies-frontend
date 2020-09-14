import {
  AspectRatio,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { MdTimer } from 'react-icons/md'
import { Link as ReachLink } from 'react-router-dom'
import Spinner from '../../Chakra/Spinner'
import Typography from '../../Chakra/Typography'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { getDuration } from '../../shared/utils/getDuration'

const RecipeItem = ({ id, title, images, user, onDeleteItem, duration }) => {
  const { userId, token } = useInfos()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const initialFocusRef = React.useRef()
  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`,
      })
      onDeleteItem(id)
      cogoToast.success('Votre recette a bien été supprimée.')
    } catch (err) {}
  }

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
      return clearError
    }
  }, [error, clearError])

  if (isLoading) {
    return <Spinner />
  }
  const { hours, minutes } = getDuration(duration)

  return (
    <>
      <Flex
        flexDir='column'
        borderRadius='md'
        justifyContent='space-between'
        transition='all linear 0.3s'
        _hover={{ boxShadow: 'lg', transform: 'scale(1.01)' }}>
        <AspectRatio as={ReachLink} to={`/recipes/recipe/${id}`} ratio={4 / 3}>
          <Image
            src={images.regularImage}
            alt='recipe'
            fit='cover'
            htmlWidth='100%'
            borderRadius='md'
          />
        </AspectRatio>

        <Typography text={title} />

        <Flex align='baseline' my={2} justify='center'>
          <ButtonGroup variant='outline'>
            {userId === user && (
              <Button as={ReachLink} colorScheme='blue' to={`/recipes/${id}`}>
                modifier
              </Button>
            )}

            <Popover initialFocusRef={initialFocusRef} placement='top'>
              {({ onClose }) => (
                <>
                  {userId === user && (
                    <PopoverTrigger>
                      <Button colorScheme='red'>supprimer</Button>
                    </PopoverTrigger>
                  )}
                  {/* <Portal> */}
                  <PopoverContent bg='orange.500' color='white' borderColor='orange.800'>
                    <PopoverHeader pt={4} fontWeight='semiBold'>
                      Supprimer {title} ?
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      Voulez-vous vraiment supprimer cette recette ? Cette action est irréversible.
                    </PopoverBody>
                    <PopoverFooter border='0' pb={4}>
                      <ButtonGroup size='sm' d='flex' alignItems='center' justifyContent='flex-end'>
                        <Button ref={initialFocusRef} colorScheme='black' onClick={onClose}>
                          Annuler
                        </Button>
                        <Button colorScheme='red' onClick={confirmDeleteHandler}>
                          Confirmer
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                  {/* </Portal> */}
                </>
              )}
            </Popover>
            <Button leftIcon={<MdTimer />} as={ReachLink} to={`/recipes/recipe/${id}`}>
              {hours > 1 ? `${hours} heures` : hours === 1 ? `${hours} heure` : null}
              {hours >= 1 && minutes > 0 && ` et ${minutes} minutes`}
              {!hours && minutes && `${minutes} minutes`}
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </>
  )
}

RecipeItem.propTypes = {
  id: PropTypes.string,
  images: PropTypes.shape({
    regularImage: PropTypes.string,
  }),
  onDeleteItem: PropTypes.func,
  title: PropTypes.string,
  user: PropTypes.string,
}

export default RecipeItem
