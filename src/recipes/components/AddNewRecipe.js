import { Button, Flex, LightMode } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { GrAdd } from 'react-icons/gr'
import { useInfos } from '../../shared/context'

const NewRecipe = () => {
  const { token, setIsOpen } = useInfos()
  // console.log(recipes);
  // const extractedUser = recipes?.find((recipe) => recipe.user === userId)
  return (
    <Flex justify={{ base: 'flex-start', md: 'flex-end' }} align='center' py={2}>
      {token && (
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
      )}
    </Flex>
  )
}

NewRecipe.propTypes = {
  recipes: PropTypes.array,
}

export default NewRecipe
