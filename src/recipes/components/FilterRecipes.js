import { Button, ButtonGroup } from '@chakra-ui/core'
import React from 'react'
import { useQueryCache } from 'react-query'

const FilterRecipes = () => {
  const queryCache = useQueryCache()
  const allRecipes = queryCache.getQueryData('allRecipes')

  const getFilteredRecipes = (choice) => {
    const recipes = allRecipes.filter((recipe) => {
      return choice === 'toutes' ? recipe : recipe.category === choice
    })
    return recipes
  }

  const items = ['entrée', 'plat principal', 'aperitif et buffet', 'dessert', 'toutes']
  return (
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
    </ButtonGroup>
  )
}

export default FilterRecipes
