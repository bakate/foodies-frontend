import { Center } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import React, { useCallback } from 'react'
import { useQuery } from 'react-query'
import Title from '../../Chakra/Heading'
import DisplayLoader from '../../Chakra/Spinner'
import RecipesList from '../components/RecipesList'

const AllRecipes = () => {

  const getRecipes = async () => {
    console.log('calling APi to get all Recipes')
    const { recipes } = await (await fetch(`${process.env.REACT_APP_BACKEND_URL}/recipes`)).json()
    return recipes
  }
  const { data, isError, isLoading, error, isFetching } = useQuery('allRecipes', getRecipes)


  const deleteHandler = useCallback(
    (recipeId) => {
      data((prev) => prev.filter((recipe) => recipe.id !== recipeId))
    },
    [ data]
  )

  if (isLoading) {
    return <DisplayLoader />
  }
  if (isError) {
    const { hide } = cogoToast.error(error.message, {
      hideAfter: 4,
      onClick: () => {
        hide()
      },
    })
  }

  if (!data?.length) {
    return (
      <Center>
        <Title title='Aucune recette de trouvée' />
      </Center>
    )
  }
  return (
    <>
  {isFetching && <DisplayLoader text="Caching..." />}
  <RecipesList recipes={data} onDelete={deleteHandler} />
  </>
  )
}

export default AllRecipes
