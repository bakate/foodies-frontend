import { AspectRatio, Button, ButtonGroup, Flex, Image } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { MdTimer } from 'react-icons/md'
import { Link as ReachLink } from 'react-router-dom'
import DisplayAlertDialog from '../../Chakra/AlertDialog'
import Spinner from '../../Chakra/Spinner'
import Typography from '../../Chakra/Typography'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { getDuration } from '../../shared/utils/getDuration'

const RecipeItem = ({ id, title, image, user, onDeleteItem, duration }) => {
  const [isOpen, setIsOpen] = React.useState()
  const onClose = () => setIsOpen(false)
  const { userId, token } = useInfos()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

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
  const { hours, minutes } = getDuration(duration)

  return (
    <Flex
      flexDir='column'
      borderRadius='md'
      justifyContent='space-between'
      transition='all linear 0.3s'
      p='0'
      bg='gray.100'
      border='1px solid gray'
      _hover={{ boxShadow: 'lg', transform: 'translateY(-5px)', opacity: '0.8' }}>
      <AspectRatio as={ReachLink} to={`/recipes/recipe/${id}`} ratio={4 / 3}>
        <Image src={image} alt='recipe' fit='cover' htmlWidth='100%' borderTopRadius='md' />
      </AspectRatio>

      <Typography text={title} />

      <ButtonGroup
        variant='ghost'
        d='flex'
        alignItems='baseline'
        my={2}
        justifyContent='space-evenly'
        px={2}>
        {userId === user && (
          <Button as={ReachLink} colorScheme='blue' to={`/recipes/${id}`}>
            modifier
          </Button>
        )}

        <>
          {userId === user && (
            <Button colorScheme='red' onClick={() => setIsOpen(true)}>
              supprimer
            </Button>
          )}
          <DisplayAlertDialog
            isOpen={isOpen}
            onClose={onClose}
            onDeleteHandler={confirmDeleteHandler}
            header={`Supprimer ${title} ?`}
            body='Voulez-vous vraiment supprimer cette recette ? Cette action est irréversible.'
          />
        </>

        <Button
          leftIcon={<MdTimer />}
          as={ReachLink}
          colorScheme='teal'
          to={`/recipes/recipe/${id}`}>
          {hours > 1 ? `${hours} heures` : hours === 1 ? `${hours} heure` : null}
          {hours >= 1 && minutes > 0 && ` et ${minutes} minutes`}
          {!hours && minutes && `${minutes} minutes`}
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

RecipeItem.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  onDeleteItem: PropTypes.func,
  title: PropTypes.string,
  user: PropTypes.string,
}

export default RecipeItem
