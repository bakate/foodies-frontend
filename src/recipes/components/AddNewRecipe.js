import { Button, ButtonGroup, Flex, IconButton } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { GrAdd } from 'react-icons/gr'
import { useInfos } from '../../shared/context'

const NewRecipe = ({ recipes }) => {
  const { userId, setIsOpen } = useInfos()
  const extractedUser = recipes && recipes.find((recipe) => recipe.user === userId)
  return (
    <Flex justify={{ base: 'start', md: 'flex-end' }} align='center' py={3}>
      {extractedUser ? (
        <ButtonGroup
          isAttached
          variant='outline'
          colorScheme='teal'
          onClick={() => setIsOpen(true)}>
          <Button mr='-px'> cr&eacute;er</Button>
          <IconButton aria-label='Add' icon={<GrAdd />} />
        </ButtonGroup>
      ) : null}
    </Flex>
  )
}

NewRecipe.propTypes = {
  recipes: PropTypes.array,
}

export default NewRecipe
