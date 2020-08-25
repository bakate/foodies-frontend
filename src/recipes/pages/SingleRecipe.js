import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Title from '../../shared/components/UiElements/Title'
import { useInfos } from '../../shared/context'
import { getDuration } from '../../shared/utils/getDuration'

const SingleRecipeStyles = styled.div`
  /* display: grid; */
  /* grid-template-columns: auto, 1fr; */

  .image {
    height: 30vh;
    width: 80vw;
    margin: 0 auto;
    transition: ${({ theme }) => theme.mainTransition};
    &:hover {
      box-shadow: ${({ theme }) => theme.darkShadow};
      transform: scale(1.05);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    @media (min-width: 768px) {
      height: 60vh;
      width: 80vw;
    }
  }
  .info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    place-content: center;
    /* place-items: space-between; */
  }

  .extra {
    display: grid;
    place-items: center auto;
    place-content: center space-evenly;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    /* gap: 1rem; */
  }
`

const SingleRecipe = () => {
  const { userRecipes } = useInfos()
  const recipeId = useParams().recipeId
  let recipe
  if (userRecipes.length) {
    recipe = userRecipes.find((item) => item.id === recipeId)
  }
  if (!recipe) {
    return <Title center title='sorry, no recipe found' />
  }

  const transformedIngredients = (string) => {
    return string
      .replace(/(<([^>]+)>)/gi, '🥣')
      .replace(/&nbsp;/gi, '')
      .split('🥣')
      .map((el) => {
        if (el.length) {
          return <li key={el}>{el}</li>
        }
        return null
      })
  }
  const { hours, minutes } = getDuration(recipe.duration)

  return (
    <SingleRecipeStyles>
      <Title bgTitle={recipe.title} center />
      <div className='image'>
        <img src={recipe.images.largeImage} alt='recipe' />
      </div>
      <div className='info'>
        <div>
          <Title title='ingr&eacute;dients :' withRow />
          <div className='content'>{transformedIngredients(recipe.ingredients)}</div>
        </div>
        <div>
          <Title title='Pr&eacute;paration :' withRow />
          <div className='content'>{transformedIngredients(recipe.cooking)}</div>
        </div>
      </div>
      <div className='extra'>
        <div>
          <Title title='Dur&eacute;e :' withRow />
          <h6>
            {hours > 1 ? `${hours} heures` : hours === 1 ? `${hours} heure` : null}
            {hours >= 1 && minutes > 0 && ` et ${minutes} minutes`}
            {!hours && minutes && `${minutes} minutes`}
          </h6>
        </div>
        <div>
          <Title title='cat&eacute;gorie :' withRow />
          <h6>{recipe.category}</h6>
        </div>
        <div>
          <Title title='recette publi&eacute;e le :' withRow />
          <h6>{new Date(recipe.published).toLocaleDateString()}</h6>
        </div>
      </div>
    </SingleRecipeStyles>
  )
}

export default SingleRecipe
