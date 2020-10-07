import { useInfiniteQuery } from 'react-query'
import fetchPlease from '../utils/Fetch'

const getRecipes = async (_, page) => {
  const { recipes } = await fetchPlease(`${process.env.REACT_APP_BACKEND_URL}/recipes?page=${page}`)
  return recipes
}

export default function useInfiniteScroll(nextId) {
  return useInfiniteQuery(['infiniteRecipes', nextId], getRecipes, {
    getFetchMore: (lastGroup) => lastGroup.nextId,
  })
}
