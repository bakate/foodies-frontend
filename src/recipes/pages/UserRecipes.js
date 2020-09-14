import cogoToast from 'cogo-toast'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../Chakra/Spinner'
import Typography from '../../Chakra/Typography'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import RecipesList from '../components/RecipesList'

const UserRecipes = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient()
  const { userRecipes, setUserRecipes } = useInfos()
  const userId = useParams().userId

  useEffect(() => {
    const getUserRecipes = async () => {
      try {
        const { recipes } = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/recipes/user/${userId}`
        )

        setUserRecipes(recipes)
      } catch (err) {}
    }
    getUserRecipes()
  }, [sendRequest, userId, setUserRecipes])

  const deleteHandler = (recipeId) => {
    setUserRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId))
  }

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

  return (
    <div>
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
