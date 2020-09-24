import { Box } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import React from 'react'
import { useQuery, useQueryCache } from 'react-query'
import { useParams } from 'react-router-dom'
import DisplayLoader from '../../Chakra/Spinner'
import Typography from '../../Chakra/Typography'
import NewRecipe from '../components/AddNewRecipe'
import RecipesList from '../components/RecipesList'

const UserRecipes = () => {
  const queryCache = useQueryCache()
  const singleUserRecipes = queryCache.getQueryData('userRecipes')
  const userId = useParams().userId

  const getRecipes = async () => {
    console.log('calling APi to get user Recipes')
    const { recipes } = await (
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/recipes/user/${userId}`)
    ).json()
    return recipes
  }
  const { data: userRecipes, isError, isLoading, error, isFetching } = useQuery(
    'userRecipes',
    getRecipes
  )

  // const { isLoading, sendRequest, error, clearError } = useHttpClient()
  // const { userRecipes, setUserRecipes } = useInfos()

  // useEffect(() => {
  //   const getUserRecipes = async () => {
  //     try {
  //       const { recipes } = await sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/recipes/user/${userId}`
  //       )

  //       setUserRecipes(recipes)
  //     } catch (err) {}
  //   }
  //   getUserRecipes()
  // }, [sendRequest, userId, setUserRecipes])

  const deleteHandler = (recipeId) => {
    singleUserRecipes.filter((recipe) => recipe.id !== recipeId)
  }

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

  if (!userRecipes.length) {
    return (
      <Box>
        <Typography text="C'est calme par ici pour le moment." />
        <NewRecipe recipes={userRecipes} />
      </Box>
    )
  }
  return (
    <div>
      {isFetching && <DisplayLoader text='Caching...' />}
      {userRecipes.length && (
        <Typography
          text={`Bravo, vous avez ${userRecipes.length} recette${
            userRecipes.length > 1 ? 's' : ''
          }`}
        />
      )}
      <RecipesList recipes={userRecipes} onDelete={deleteHandler} />
    </div>
  )
}

export default UserRecipes
