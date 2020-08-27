import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Button from '../../shared/components/FormElements/Button'
import { useInfos } from '../../shared/context'
import { UsersListStyles } from '../../user/components/UsersList'
import RecipeItem from './RecipeItem'

const CallToAction = styled.div`
  display: flex;
  justify-content: space-between;
  place-items: center;
`

const RecipesList = ({ recipes, onDelete }) => {
  const { userId } = useInfos()
  // console.log({ recipes })
  // if (!recipes.length) {
  //   return (
  //     <UsersListStyles>
  //       <h3>Aucune recette de trouv&eacute;e. Créez une nouvelle ?</h3>
  //       <Button to='/recipes/new'>Create a recipe</Button>
  //     </UsersListStyles>
  //   )
  // }
  const extractedUser = recipes.find((recipe) => recipe.user === userId)

  return (
    <>
      <CallToAction>
        <h3>
          {extractedUser ? 'Bravo vous avez ' : 'Cet utlisateur a '}
          {`${recipes.length} recette${recipes.length > 1 ? 's' : ''} actuellement`}
        </h3>

        <Button to='/recipes/new'>cr&eacute;er</Button>
      </CallToAction>
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
