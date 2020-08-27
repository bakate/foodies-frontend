import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../shared/components/FormElements/Button'
import Title from '../../shared/components/UiElements/Title'
import { useInfos } from '../../shared/context'
import { getDuration } from '../../shared/utils/getDuration'
import { CallToAction } from '../components/RecipesList'

const SingleRecipeStyles = styled.div`
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
  const history = useHistory()
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
      .map((el, i) => {
        if (el.length) {
          return <li key={i}>{el}</li>
        }
        return null
      })
  }

  const { hours, minutes } = getDuration(recipe.duration)

  return (
    <>
      <CallToAction>
        <Button type='button' onClick={() => history.push('/')}>
          retour
        </Button>
      </CallToAction>
      <SingleRecipeStyles>
        <Title bgTitle={recipe.title} center />
        <div className='image'>
          <img src={recipe.images.largeImage} alt='recipe' />
        </div>
        <div className='info'>
          <div>
            <Title title='ingr&eacute;dients :' withRow />
            <ul className='content'>{transformedIngredients(recipe.ingredients)}</ul>
          </div>
          <div>
            <Title title='Pr&eacute;paration :' withRow />
            <ol className='content'>{transformedIngredients(recipe.cooking)}</ol>
          </div>
        </div>
        <div className='extra'>
          <div>
            <Title title='Dur&eacute;e :' withRow />
            <h4>
              {hours > 1 ? `${hours} heures` : hours === 1 ? `${hours} heure` : null}
              {hours >= 1 && minutes > 0 && ` et ${minutes} minutes`}
              {!hours && minutes && `${minutes} minutes`}
            </h4>
          </div>
          <div>
            <Title title='cat&eacute;gorie :' withRow />
            <h4>{recipe.category}</h4>
          </div>
          <div>
            <Title title='recette publi&eacute;e le :' withRow />
            <h4>
              {new Date(recipe.published).toLocaleDateString('fr', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h4>
          </div>
        </div>
      </SingleRecipeStyles>
    </>
  )
}

export default SingleRecipe
