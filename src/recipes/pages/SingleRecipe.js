import { AspectRatio, Box, Center, Grid, Heading, Icon, Image, SimpleGrid } from '@chakra-ui/core'
import React, { useRef } from 'react'
import { GiHotMeal } from 'react-icons/gi'
import { MdTimer, MdToday } from 'react-icons/md'
import { useQueryCache } from 'react-query'
import { useParams } from 'react-router-dom'
import Title from '../../Chakra/Heading'
import DisplayLoader from '../../Chakra/Spinner'
import { getDuration } from '../../shared/utils/getDuration'

const SingleRecipe = () => {
  const queryCache = useQueryCache()
  const allRecipes = queryCache.getQueryData('allRecipes')
  const recipeId = useParams().recipeId
  let recipeRef = useRef()

  if (allRecipes?.length) {
    recipeRef.current = allRecipes.find((item) => item.id === recipeId)
  }

  if (!recipeRef.current) {
    return <Title title="oops, Quelque chose s'est mal passée" />
  }
  if (!recipeRef?.current?.image) {
    return <DisplayLoader />
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
const {duration, title, image, category, published, ingredients, cooking} = recipeRef.current || {};
  const { hours, minutes } = getDuration(duration)
  return (
    <Grid gap={4}>
      <Center>
        <Title title={title} />
      </Center>
      <AspectRatio ratio={4 / 3} maxW='100vw' maxH='60vh' >
        <Image src={image} alt={title} fit='contain' w='100%'  ignoreFallback />
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
            {category}
          </Heading>
        </Box>
        <Box>
          <Icon as={MdToday} boxSize={10} color='orange.500' />

          <Heading as='h6' fontWeight='normal' size='sm'>
            {new Date(published).toLocaleDateString('fr-FR', {
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
          <ul>{transformedIngredients(ingredients)}</ul>
        </Box>
        <Box>
          <Title title='Pr&eacute;paration' color='orange.500' />
          <ol>{transformedIngredients(cooking)}</ol>
        </Box>
      </SimpleGrid>
    </Grid>
  )
}

export default SingleRecipe
