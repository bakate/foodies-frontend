import { Button, ButtonGroup, Flex, IconButton, LightMode } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { GrAdd } from 'react-icons/gr'
import { useInfos } from '../../shared/context'

const NewRecipe = ({ recipes }) => {
  const { userId, setIsOpen } = useInfos()
  const extractedUser = recipes && recipes.find((recipe) => recipe.user === userId)
  return (
    <Flex justify={{ base: 'flex-start', md: 'flex-end' }} align='center' py={2}>
      {extractedUser ? (
        <ButtonGroup isAttached variant='solid' colorScheme='teal' onClick={() => setIsOpen(true)}>
          <LightMode>
            <Button mr='-px'> cr&eacute;er</Button>
            <IconButton aria-label='Add' icon={<GrAdd />} />
          </LightMode>
        </ButtonGroup>
      ) : null}
    </Flex>
  )
}

NewRecipe.propTypes = {
  recipes: PropTypes.array,
}

export default NewRecipe
