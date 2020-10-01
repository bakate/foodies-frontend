import { Center } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import React, { useCallback } from 'react'
import Title from '../../Chakra/Heading'
import DisplayLoader from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import usePagination from '../../shared/hooks/usePagination'
import Pagination from '../components/Pagination'
import RecipesList from '../components/RecipesList'
import SideMenu from '../components/SideMenu'

const AllRecipes = () => {

  const { page ,allRecipes, query} = useInfos();

   const { resolvedData, latestData, isError, isLoading, error, isFetching } = usePagination(page)
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


  return (
    <>
  {isFetching && <DisplayLoader/>}
  <SideMenu />
    {
      query &&  !Object?.values(query).find(el => el.length) &&(
      <>
      <RecipesList recipes={resolvedData.itemsList} onDelete={deleteHandler}/>
      <Pagination latestData={latestData} resolvedData={resolvedData}/>
      </>)
     }
   {
   query &&
        Object?.values(query).find(el => el.length) && allRecipes?.length ?
  <RecipesList recipes={allRecipes} onDelete={deleteHandler} />
        : !allRecipes?.length &&
          <Center>
            <Title title='Aucune recette de trouvée avec ces critères' />
          </Center>
       }
      </>
  )
}

export default AllRecipes

