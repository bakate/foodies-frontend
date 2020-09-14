import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  SimpleGrid
} from '@chakra-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Title from '../../Chakra/Heading'
import { useInfos } from '../../shared/context'
import { getDuration } from '../../shared/utils/getDuration'

const SingleRecipe = () => {
  const history = useHistory()
  const { allRecipes } = useInfos()
  const recipeId = useParams().recipeId
  let recipe
  if (allRecipes.length) {
    recipe = allRecipes.find((item) => item.id === recipeId)
  }
  if (!recipe) {
    return <Title title="oops, Quelque chose s'est mal passée" />
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
    <Box>
      <Flex justify='flex-start' my={1}>
        <Button onClick={() => history.goBack()} colorScheme='blue' variant='outline'>
          retour
        </Button>
      </Flex>
      <Grid gap={4}>
        <Center>
          <Title title={recipe.title} />
        </Center>
        <AspectRatio ratio={4 / 3} maxW='100vw' h='60vh'>
          <Image src={recipe.images.largeImage} alt='recipe' objectFit='cover' w='100%' />
        </AspectRatio>
        <SimpleGrid minChildWidth='90px' textAlign='center'>
          <Box>
            <Heading as='h5' fontWeight='semibold' size='sm' color='orange.500'>
              Temps :
            </Heading>
            <Heading as='h6' fontWeight='normal' size='sm'>
              {hours > 1 ? `${hours} heures` : hours === 1 ? `${hours} heure` : null}
              {hours >= 1 && minutes > 0 && ` et ${minutes} minutes`}
              {!hours && minutes && `${minutes} minutes`}
            </Heading>
          </Box>
          <Box>
            <Heading as='h6' fontWeight='semibold' size='sm' color='orange.500'>
              Cat&eacute;gorie :
            </Heading>
            <Heading as='h6' fontWeight='normal' size='sm'>
              {recipe.category}
            </Heading>
          </Box>
          <Box>
            <Heading as='h5' fontWeight='semibold' size='sm' color='orange.500'>
              Publi&eacute;e le :
            </Heading>
            <Heading as='h6' fontWeight='normal' size='sm'>
              {new Date(recipe.published).toLocaleDateString('fr', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Heading>
          </Box>
        </SimpleGrid>
        <SimpleGrid minChildWidth='200px' spacing='1rem' px={{ base: '2', md: '8' }} mb={4}>
          <Box>
            <Title title='ingr&eacute;dients :' color='orange.500' />
            <ul>{transformedIngredients(recipe.ingredients)}</ul>
          </Box>
          <Box>
            <Title title='Pr&eacute;paration :' color='orange.500' />
            <ol>{transformedIngredients(recipe.cooking)}</ol>
          </Box>
        </SimpleGrid>
      </Grid>
    </Box>
  )
}

export default SingleRecipe
