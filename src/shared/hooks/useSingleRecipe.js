import { useQuery } from 'react-query'
import fetchPlease from '../utils/Fetch'

const getSingleRecipe = async (_, id) => {
  const { recipe } = await fetchPlease(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`)
  return recipe
}

export default function useSIngleRecipe(recipeId) {
  return useQuery(['singleRecipe', recipeId], getSingleRecipe)
}
