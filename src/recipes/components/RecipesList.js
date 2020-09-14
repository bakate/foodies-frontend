import { Grid } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useInfos } from '../../shared/context'
import NewRecipeModal from '../pages/NewRecipeModal'
import NewRecipe from './AddNewRecipe'
import RecipeItem from './RecipeItem'

const RecipesList = ({ recipes, onDelete }) => {
  const { isOpen, onClose } = useInfos()

  return (
    <>
      <NewRecipeModal isOpen={isOpen} onClose={onClose} />
      <NewRecipe recipes={recipes} />

      <Grid
        templateColumns='repeat(auto-fill, minmax(350px, 1fr))'
        gap={{ base: 4, md: 10 }}
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
