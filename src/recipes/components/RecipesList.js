import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Button from '../../shared/components/FormElements/Button'
import Title from '../../shared/components/UiElements/Title'
import { UsersListStyles } from '../../user/components/UsersList'
import RecipeItem from './RecipeItem'

export const RecipesStyles = styled(UsersListStyles)`
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  margin: 0 auto;

  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
`

const RecipesList = ({ recipes, onDelete }) => {
  if (!recipes.length) {
    return (
      <RecipesStyles>
        <h3>Aucune recette de trouv&eacute;e. Créez une nouvelle ?</h3>
        <Button to='/recipes/new'>Create a recipe</Button>
      </RecipesStyles>
    )
  }
  return (
    <>
      <Title
        title={`Bravo, vous avez ${recipes.length} recette${
          recipes.length > 1 ? 's' : ''
        } actuellement`}
        center
      />
      <UsersListStyles>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} {...recipe} onDeleteItem={onDelete} />
        ))}
        {/* {recipes.map(
        ({ id, category, title, ingredients, images, duration, published, cooking, user }) => (
          <RecipeItem
            key={id}
            category={category}
            ingredients={ingredients}
            title={title}
            images={images}
            duration={duration}
            published={published}
            cooking={cooking}
            id={id}
            user={user}
            onDeleteItem={onDelete}
          />
        )
      )} */}
      </UsersListStyles>
    </>
  )
}

RecipesList.propTypes = {
  onDelete: PropTypes.func,
  recipes: PropTypes.array,
}

export default RecipesList
