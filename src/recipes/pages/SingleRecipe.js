import { AspectRatio, Box, Center, Grid, Heading, Icon, Image, SimpleGrid } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import { GiHotMeal } from 'react-icons/gi'
import { MdTimer, MdToday } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import Title from '../../Chakra/Heading'
import Spinner from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import { getDuration } from '../../shared/utils/getDuration'

const SingleRecipe = () => {
  const { allRecipes } = useInfos()
  const [recipe, setRecipe] = useState()
  const recipeId = useParams().recipeId
  useEffect(() => {
    if (allRecipes.length) {
      setRecipe(allRecipes.find((item) => item.id === recipeId))
    }
  }, [allRecipes, recipeId])
  if (!recipe) {
    return <Title title="oops, Quelque chose s'est mal passée" />
  }
  if (!recipe.image) {
    return <Spinner />
  }

  const transformedIngredients = (string) => {
    return string
      .replace(/\n|<([^>]+)>/gi, '🥣')
      .replace(/&nbsp;/gi, '')
      .split('🥣')
      .map((el, i) => {
        if (el.length > 2) {
          return <li key={i}>{el}</li>
        }
        return null
      })
  }

  const { hours, minutes } = getDuration(recipe.duration)
  return (
    <Grid gap={4}>
      <Center>
        <Title title={recipe.title} />
      </Center>
      <AspectRatio ratio={4 / 3} maxW='100vw' h='60vh'>
        <Image src={recipe && recipe.image} alt='recipe' objectFit='contain' w='100%' />
      </AspectRatio>
      <SimpleGrid minChildWidth='40px' textAlign='center' textTransform='capitalize'>
        <Box>
          <Icon as={MdTimer} boxSize={10} color='orange.500' />

          <Heading as='h6' fontWeight='normal' size='sm'>
            {hours > 1 && !minutes
              ? `${hours} heures`
              : hours === 1 && !minutes
              ? `${hours} heure`
              : null}
            {hours >= 1 && minutes > 0 && `${hours}h${minutes}`}
            {!hours && minutes && `${minutes} minutes`}
          </Heading>
        </Box>
        <Box>
          <Icon as={GiHotMeal} boxSize={10} color='orange.500' />

          <Heading as='h6' fontWeight='normal' size='sm'>
            {recipe.category}
          </Heading>
        </Box>
        <Box>
          <Icon as={MdToday} boxSize={10} color='orange.500' />

          <Heading as='h6' fontWeight='normal' size='sm'>
            {new Date(recipe.published).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Heading>
        </Box>
      </SimpleGrid>
      <SimpleGrid minChildWidth='200px' spacing='1rem' px={{ base: '2', md: '8' }} mb={4}>
        <Box>
          <Title title='ingr&eacute;dients' color='orange.500' />
          <ul>{transformedIngredients(recipe.ingredients)}</ul>
        </Box>
        <Box>
          <Title title='Pr&eacute;paration' color='orange.500' />
          <ol>{transformedIngredients(recipe.cooking)}</ol>
        </Box>
      </SimpleGrid>
    </Grid>
  )
}

export default SingleRecipe
