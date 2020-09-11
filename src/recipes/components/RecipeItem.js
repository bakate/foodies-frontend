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
import PropTypes from 'prop-types'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import Spinner from '../../Chakra/Spinner'
import Typography from '../../Chakra/Typography'
import ErrorMessage from '../../shared/components/UiElements/ErrorMessage'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const RecipeItem = ({ id, title, images, user, onDeleteItem }) => {
  const { userId, token } = useInfos()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const initialFocusRef = React.useRef()
  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`,
      })
      onDeleteItem(id)
    } catch (err) {}
  }

  if (isLoading) {
    return <Spinner />
  }
  if (error) {
    return <ErrorMessage errorMessage={error} onClear={clearError} />
  }

  return (
    <>
      <Flex
        flexDir='column'
        borderRadius='md'
        justifyContent='space-between'
        _hover={{ boxShadow: '3px 3px 3px 3px #888888' }}>
        <AspectRatio as={ReachLink} to={`/recipes/recipe/${id}`} ratio={4 / 3}>
          <Image
            src={images.regularImage}
            alt='recipe'
            fit='cover'
            htmlWidth='100%'
            borderTopRadius='md'
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

            <Button as={ReachLink} colorScheme='teal' variant='solid' to={`/recipes/recipe/${id}`}>
              voir
            </Button>

            <Popover initialFocusRef={initialFocusRef} placement='top'>
              <PopoverTrigger>
                <div>{userId === user && <Button colorScheme='red'>supprimer</Button>}</div>
              </PopoverTrigger>
              <PopoverContent bg='orange.500' color='white' borderColor='orange.800'>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                  Supprimer {title}
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Voulez-vous vraiment supprimer cette recette ? Cette action est irréversible.
                </PopoverBody>
                <PopoverFooter
                  border='0'
                  d='flex'
                  alignItems='center'
                  justifyContent='center'
                  pb={4}>
                  <ButtonGroup size='sm'>
                    <Button ref={initialFocusRef} colorScheme='black'>
                      Annuler
                    </Button>
                    <Button colorScheme='red' onClick={confirmDeleteHandler}>
                      Confirmer
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
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
