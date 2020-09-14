import { Center, Skeleton } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import React, { useCallback, useEffect } from 'react'
import Title from '../../Chakra/Heading'
import Spinner from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import RecipesList from '../components/RecipesList'

const AllRecipes = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { allRecipes, setAllRecipes } = useInfos()

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { recipes } = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes`)
        setAllRecipes(recipes)
      } catch (err) {}
    }
    getRecipes()
  }, [sendRequest, setAllRecipes])

  const deleteHandler = useCallback(
    (recipeId) => {
      allRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId))
    },
    [allRecipes]
  )

  useEffect(() => {
    if (error) {
      const { hide } = cogoToast.error(error, {
        hideAfter: 6,
        onClick: () => {
          hide()
        },
      })
    }
    return () => {
      return clearError()
    }
  }, [error, clearError])
  if (isLoading) {
    return <Spinner />
  }
  if (!allRecipes.length) {
    return (
      <Center>
        <Title title='Aucune recette de trouvée' />
      </Center>
    )
  }
  return (
    <Skeleton isLoaded={!isLoading}>
      <RecipesList recipes={allRecipes} onDelete={deleteHandler} />
    </Skeleton>
  )
}

export default AllRecipes
