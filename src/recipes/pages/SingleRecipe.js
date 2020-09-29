import { AspectRatio, Box, Center, Grid, Heading, Icon, Image, List, SimpleGrid } from '@chakra-ui/core'
import React, { useRef } from 'react'
import { GiHotMeal } from 'react-icons/gi'
import { IoMdFitness } from 'react-icons/io'
import { MdTimer, MdToday } from 'react-icons/md'
import { useQueryCache } from 'react-query'
import { useParams } from 'react-router-dom'
import Title from '../../Chakra/Heading'
import DisplayLoader from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import { getDuration } from '../../shared/utils/getDuration'

const SingleRecipe = () => {
  const queryCache = useQueryCache()
  const { page } = useInfos();
  const allRecipes = queryCache.getQueryData(["allRecipes", page])
  const {recipeId} = useParams()
  let recipeRef = useRef()

  if (allRecipes?.itemsList?.length) {
    recipeRef.current = allRecipes.itemsList.find((item) => item._id === recipeId)
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
        if (el.length > 1) {
          return (
            <div key={i}>
          <li >- {el}
          </li>
<br/>
            </div>
          )
        }
        return null
      })
  }
const {duration, title, image, category, published, ingredients, cooking, difficulty} = recipeRef.current || {};
  const { hours, minutes } = getDuration(duration)
  return (
    <Grid gap={4}>
      <Center>
        <Title title={title} />
      </Center>
      <AspectRatio ratio={4 / 3} maxW='100vw' maxH='60vh' >
        <Image src={image} alt={title} fit='contain' w='100%'  ignoreFallback />
      </AspectRatio>
      <SimpleGrid minChildWidth={{base: "30px", md:'40px'}} textAlign='center' textTransform='capitalize'>
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
          <Icon as={IoMdFitness} boxSize={10} color='orange.500' />
          <Heading as='h6' fontWeight='normal' size='sm'>
            {difficulty}
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
              month: 'short',
              day: 'numeric',
            })}
          </Heading>
        </Box>
      </SimpleGrid>
      <SimpleGrid minChildWidth='200px' spacing='1rem' px={{ base: '2', md: '8' }} mb={4}>
        <Box>
          <Title title='ingr&eacute;dients' color='orange.500' />
          <List>{transformedIngredients(ingredients)}</List>
        </Box>
        <Box>
          <Title title='Pr&eacute;paration' color='orange.500' />
          <List>{transformedIngredients(cooking)}</List>
        </Box>
      </SimpleGrid>
    </Grid>
  )
}

export default SingleRecipe
