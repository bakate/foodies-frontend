import { Box, Button, Input, Select, Stack } from '@chakra-ui/core'
import React, { useEffect } from 'react'
import { useQuery, useQueryCache } from 'react-query'
import Typography from '../../Chakra/Typography'
import { useInfos } from '../../shared/context'
import fetchPlease from '../../shared/utils/Fetch'
import useForm from '../../shared/utils/useForm'

const categoryChoices = [ 'entrée', 'plat principal', 'aperitif et buffet', 'dessert']
const difficultyChoices = [ 'facile', 'moyen', 'difficile']

const SideMenu = () => {
  const { setAllRecipes, query, setQuery } = useInfos()

  const { inputs, handleChange, clearForm } = useForm({
    ingredients: '',
    category: '',
    difficulty: '',
  })

  const getRecipes = async () => {
    const { recipes } = await fetchPlease(`${process.env.REACT_APP_BACKEND_URL}/recipes/all`)
    setAllRecipes(recipes)
    return recipes
  }
  const { data } = useQuery('allRecipes', getRecipes)
const queryCache = useQueryCache()
const staledRecipes = queryCache.getQueryData(['allRecipes'])
  useEffect(() => {
    let recipes
    if (data?.length) {
      recipes = data
    }else {
      recipes  = staledRecipes
    }
    Object.values(inputs).filter((el) => el.length) && setQuery(inputs)
    const { ingredients, category, difficulty } = query||{}
    if (ingredients?.length) {
      const reg = new RegExp(ingredients, 'gi')
      recipes = recipes?.filter((item) => item.title.match(reg) || item.ingredients.match(reg))
    }
    if (category?.length) {
      recipes = recipes?.filter((item) => category === "Cherchez par catégorie" ? item:  item.category === category)
    }

    if (difficulty?.length) {
      recipes = recipes?.filter((item) => difficulty === "Cherchez par difficulté"? item :item.difficulty === difficulty)
    }
 setAllRecipes(recipes)
  }, [inputs, setQuery, query, setAllRecipes, data, staledRecipes])
  return (
    <Box textAlign='center'>
      <Typography text='Trouvez rapidement une recette' py={3} />
      <Stack direction={['column', 'row']} spacing='.5rem'>
        <Input
          id='ingredients'
          name='ingredients'
          placeholder='Cherchez par ingrédients'
          size='sm'
          borderRadius='md'
          value={inputs.ingredients}
          onChange={handleChange}
        />

        <Select
          borderRadius='md'
          name='category'
          size='sm'
          placeholder="Cherchez par catégorie"
          value={inputs.category}
          onChange={handleChange}>
          {categoryChoices.map((item, i) => (
            <option key={i}>{item}</option>
          ))}
        </Select>

        <Select
          size='sm'
          borderRadius='md'
          name='difficulty'
          placeholder="Cherchez par difficulté"
          onChange={handleChange}
          value={inputs.difficulty}>
          {difficultyChoices.map((item, i) => (
            <option key={i}>{item}</option>
          ))}
        </Select>
      </Stack>
      <Button onClick={clearForm} size='sm' mt={3}>
        Réinitialiser
      </Button>
    </Box>
  )
}

export default SideMenu
