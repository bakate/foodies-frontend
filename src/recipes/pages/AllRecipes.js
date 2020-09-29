import { Center } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import React, { useCallback } from 'react'
import { usePaginatedQuery } from 'react-query'
import Title from '../../Chakra/Heading'
import DisplayLoader from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import fetchPlease from '../../shared/utils/Fetch'
import Pagination from '../components/Pagination'
import RecipesList from '../components/RecipesList'

const AllRecipes = () => {

  const { page } = useInfos();
  const getRecipes = async (_, page=1) => {
    const { recipes } = await fetchPlease(`${process.env.REACT_APP_BACKEND_URL}/recipes?page=${page}`)
    return recipes
  }
  const { resolvedData,latestData, isError, isLoading, error, isFetching } = usePaginatedQuery(['allRecipes', page], getRecipes)
const deleteHandler = useCallback(
  (recipeId) => {
    resolvedData.itemsList((prev) => prev.filter((recipe) => recipe.id !== recipeId))
  },
  [resolvedData]
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

  if (!resolvedData?.itemsList?.length) {
    return (
      <Center>
        <Title title='Aucune recette de trouvée' />
      </Center>
    )
  }
  // const getFilteredRecipes = (choice = "toutes") => {
  //   const recipes =resolvedData.itemsList.filter((recipe) => {
  //     return choice === 'toutes' ? recipe : recipe.category === choice
  //   })
  //   setRecipes(recipes)
  // }

  return (
    <>
  {isFetching && <DisplayLoader/>}
<RecipesList recipes={resolvedData.itemsList} onDelete={deleteHandler}/>
<Pagination latestData={latestData} resolvedData={resolvedData}/>
  </>
  )
}

export default AllRecipes
