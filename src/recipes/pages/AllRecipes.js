import cogoToast from 'cogo-toast'
import React, { useEffect } from 'react'
import Spinner from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import RecipesList from '../components/RecipesList'

const AllRecipes = () => {
  const { isLoading, error, sendRequest } = useHttpClient()
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

  useEffect(() => {
    if (error) {
      const { hide } = cogoToast.error(error, {
        hideAfter: 6,
        onClick: () => {
          hide()
        },
      })
    }
  }, [error])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <RecipesList recipes={allRecipes} />
    </>
  )
}

export default AllRecipes
