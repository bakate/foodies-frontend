import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import ErrorMessage from '../../shared/components/UiElements/ErrorMessage'
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import RecipesList from '../components/RecipesList'

const UserRecipes = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { userRecipes, setUserRecipes, userId: user } = useInfos()
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

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    )
  }
  if (error) {
    return <ErrorMessage errorMessage={error} onClear={clearError} />
  }
  if (!userRecipes.length) {
    return (
      <div className='center'>
        {user !== userId && <h2>Cet utlisateur n'a pas encore de recettes.</h2>}
        {user === userId && <h2>Vous n'avez pas encore créé de recettes.</h2>}
        <Button to='/recipes/new'>cr&eacute;er</Button>
      </div>
    )
  }

  return <RecipesList recipes={userRecipes} onDelete={deleteHandler} />
}

export default UserRecipes
