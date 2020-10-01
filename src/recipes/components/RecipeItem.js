import {
  AspectRatio,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Skeleton,
  useColorMode
} from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { MdDeleteForever, MdModeEdit, MdTimer } from 'react-icons/md'
import { Link as ReachLink, useLocation } from 'react-router-dom'
import DisplayAlertDialog from '../../Chakra/AlertDialog'
import DisplayLoader from '../../Chakra/Spinner'
import Typography from '../../Chakra/Typography'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { getDuration } from '../../shared/utils/getDuration'

const RecipeItem = ({ _id, title, image, user, onDeleteItem, duration }) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState()
  const onClose = () => setIsOpen(false)
  const { userId, token } = useInfos()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.100', dark: 'gray.700' }

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/${_id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`,
      })
      onDeleteItem(_id)
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
    return <DisplayLoader />
  }
  const { hours, minutes } = getDuration(duration)

  return (
    <Skeleton isLoaded>
      <Flex
        flexDir='column'
        borderRadius='md'
        justifyContent='space-between'
        transition='all linear 0.3s'
        p='0'
        bg={bgColor[colorMode]}
        border='1px solid gray'
        _hover={{ boxShadow: 'lg', transform: 'translateY(-5px)', opacity: '0.8' }}>
        <AspectRatio as={ReachLink} to={`/recipes/recipe/${_id}`} ratio={4 / 3}>
          <Image
            src={image}
            alt='recipe'
            fit='cover'
            htmlWidth='100%'
            borderTopRadius='md'
            ignoreFallback
          />
        </AspectRatio>

        <Typography text={title} pt={2} isTruncated />

        <ButtonGroup
          variant='ghost'
          d='flex'
          alignItems='baseline'
          my={2}
          justifyContent='space-evenly'
          px={2}>
          {userId === user && (
            <Button
              as={ReachLink}
              leftIcon={<MdModeEdit />}
              colorScheme='blue'
              to={`/recipes/${_id}`}>
              modifier
            </Button>
          )}

          <>
            {userId === user && location.pathname !== '/' && (
              <Button
                colorScheme='red'
                leftIcon={<MdDeleteForever />}
                onClick={() => setIsOpen(true)}>
                supprimer
              </Button>
            )}
            <DisplayAlertDialog
              isOpen={isOpen}
              onClose={onClose}
              onDeleteHandler={confirmDeleteHandler}
              header={`Supprimer ${title} ?`}
              body='Cette action est irréversible.'
            />
          </>

          <Button
            leftIcon={<MdTimer />}
            as={ReachLink}
            colorScheme='teal'
            to={`/recipes/recipe/${_id}`}>
            {hours > 1 && !minutes
              ? `${hours} heures`
              : hours === 1 && !minutes
              ? `${hours} heure`
              : null}
            {hours >= 1 && minutes > 0 && `${hours}h${minutes}`}
            {!hours && minutes && `${minutes} minutes`}
          </Button>
        </ButtonGroup>
      </Flex>
    </Skeleton>
  )
}

RecipeItem.propTypes = {
  _id: PropTypes.string,
  image: PropTypes.string,
  onDeleteItem: PropTypes.func,
  title: PropTypes.string,
  user: PropTypes.string,
  duration: PropTypes.number,
}

export default RecipeItem
