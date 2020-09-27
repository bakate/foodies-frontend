import { Button, Flex, LightMode } from '@chakra-ui/core'
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
        <LightMode>
          <Button
            rightIcon={<GrAdd />}
            variant='solid'
            colorScheme='teal'
            onClick={() => setIsOpen(true)}>
            {' '}
            cr&eacute;er
          </Button>
        </LightMode>
      ) : null}
    </Flex>
  )
}

NewRecipe.propTypes = {
  recipes: PropTypes.array,
}

export default NewRecipe
