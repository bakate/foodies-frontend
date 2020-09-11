import { Button, ButtonGroup, Flex, Grid, IconButton } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { GrAdd } from 'react-icons/gr'
import styled from 'styled-components'
import Modal from '../../Chakra/Modal'
import { useInfos } from '../../shared/context'
import RecipeItem from './RecipeItem'


export const CallToAction = styled.div`
  display: flex;
  justify-content: space-between;
  place-items: center;
`

const RecipesList = ({ recipes, onDelete }) => {
  const { userId, setIsOpen, isOpen, onClose} = useInfos()

  const extractedUser = recipes?.find((recipe) => recipe.user === userId)

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} />


       <Flex justify={{ base: 'start', md: 'flex-end' }} align='center' py={3}>
        {/* <Heading as='h5' fontWeight='normal' size='md'>
          {extractedUser && `Bravo vous avez ${recipes.length} recette${recipes.length > 1 ? 's':""} actuellement` }

        </Heading>  */}

        {extractedUser ? (


          <ButtonGroup isAttached variant="outline" colorScheme='teal' onClick={()=> setIsOpen(true)}>
            <Button mr="-px" > cr&eacute;er</Button>
            <IconButton aria-label="Add" icon={<GrAdd />} />
          </ButtonGroup>

        ) : null}
      </Flex>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(3,1fr)' }}
        gap={6}
        justifyContent='space-evenly'
        alignItems='center'>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} {...recipe} onDeleteItem={onDelete} />
        ))}
      </Grid>
    </>
  )
}

RecipesList.propTypes = {
  onDelete: PropTypes.func,
  recipes: PropTypes.array,
}

export default RecipesList
