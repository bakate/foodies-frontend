import { usePaginatedQuery } from 'react-query'
import fetchPlease from '../utils/Fetch'

const getRecipes = async (_, page) => {
  const { recipes } = await fetchPlease(`${process.env.REACT_APP_BACKEND_URL}/recipes?page=${page}`)
  return recipes
}

export default function usePagination(pg) {
  return usePaginatedQuery(['filteredRecipes', pg], getRecipes)
}
