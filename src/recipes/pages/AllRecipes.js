import { Button, ButtonGroup, Center } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import React, { useCallback } from 'react'
import { usePaginatedQuery } from 'react-query'
import Title from '../../Chakra/Heading'
import DisplayLoader from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import fetchPlease from '../../shared/utils/Fetch'
import RecipesList from '../components/RecipesList'

const AllRecipes = () => {
  const { page, setPage} = useInfos();

  // const [recipes, setRecipes] = useState([])
  // const items = ['entrée', 'plat principal', 'aperitif et buffet', 'dessert', 'toutes']

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
  {isFetching && <DisplayLoader text="Caching..." />}
  <ButtonGroup size="sm" d="flex" justifyContent="center" alignItems="center" >
        <Button variant="ghost" onClick={() => setPage(old => Math.max(old - 1, 1))} _focus={{ outline: "none" }} disabled={!latestData?.hasPrev} borderRadius="full">Préc</Button>
   {Array.from({length: resolvedData.totalPages}, (_, i)=> (
     <Button borderRadius="full" _focus={{ outline: "none" }} key={i} onClick={()=>setPage(i+1)} colorScheme={i+1 === latestData?.currentPage ? "orange": null}>{i+1}</Button>
   )) }
        <Button borderRadius="full" _focus={{ outline: "none" }} variant="ghost" onClick={()=> setPage(old => (!latestData || !latestData?.hasNext ? old: old +1))} disabled={!latestData?.hasNext}>Suiv</Button></ButtonGroup>
{/*
      <ButtonGroup
        d='flex'
        justifyContent={{ base: 'flex-start', md: 'center' }}
        alignItems='center'
        alignContent='center'
        variant='outline'
        flexShrink='2'
        flexWrap='wrap'
        overflow='hidden'
        colorScheme='orange'>
        {items.map((item, i) => (
          <Button borderRadius='full' key={i} onClick={() => getFilteredRecipes(item)}>
            {item}
          </Button>
        ))}
      </ButtonGroup> */}

      <RecipesList recipes={resolvedData.itemsList} onDelete={deleteHandler}/>
{/* {!recipes.length &&  <RecipesList recipes={data} onDelete={deleteHandler}  />} */}
      <ButtonGroup size="sm" d="flex" justifyContent="center" alignItems="center" py={3}>
        <Button _focus={{ outline: "none" }} variant="ghost" onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={!latestData?.hasPrev} borderRadius="full">Préc</Button>
        {Array.from({ length: resolvedData.totalPages }, (_, i) => (
          <Button borderRadius="full" _focus={{ outline: "none" }} key={i} onClick={() => setPage(i + 1)} colorScheme={i + 1 === latestData?.currentPage ? "orange" : null}>{i + 1}</Button>
        ))}
        <Button borderRadius="full" _focus={{ outline: "none" }} variant="ghost" onClick={() => setPage(old => (!latestData || !latestData?.hasNext ? old : old + 1))} disabled={!latestData?.hasNext}>Suiv</Button></ButtonGroup>
  </>
  )
}

export default AllRecipes
