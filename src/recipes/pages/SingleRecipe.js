import {
  AspectRatio,
  Box,
  Center,
  Grid,
  Heading,
  Icon,
  Image,
  List,
  SimpleGrid
} from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import React from 'react'
import { GiHotMeal } from 'react-icons/gi'
import { IoMdFitness } from 'react-icons/io'
import { MdTimer, MdToday } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import Title from '../../Chakra/Heading'
import DisplayLoader from '../../Chakra/Spinner'
import useSIngleRecipe from '../../shared/hooks/useSingleRecipe'
import { getDuration } from '../../shared/utils/getDuration'

const SingleRecipe = () => {
  const { recipeId } = useParams()

  const { data, isLoading, isError, error } = useSIngleRecipe(recipeId)

  if (isLoading) {
    return <DisplayLoader />
  }
  if (isError) {
    const { hide } = cogoToast.error(error.message, {
      hideAfter: 4,
      onClick: () => {
        hide()
      },
    })
  }

  const transformedIngredients = (string) => {
    return string
      .replace(/\n|<([^>]+)>/gi, '🥣')
      .replace(/&nbsp;/gi, '')
      .split('🥣')
      .map((el, i) => {
        if (el.length > 2) {
          return (
            <div key={i}>
              <li>- {el}</li>
              <br />
            </div>
          )
        }
        return null
      })
  }
  const { duration, title, image, category, published, ingredients, cooking, difficulty } =
    data || {}
  const { hours, minutes } = getDuration(duration)
  return (
    <Grid gap={4}>
      <Center>
        <Title title={title} />
      </Center>
      <AspectRatio ratio={4 / 3} maxW='100vw' maxH='85vh'>
        <Image src={image} alt={title} fit='contain' w='100%' ignoreFallback />
      </AspectRatio>
      <SimpleGrid
        minChildWidth={{ base: '30px', md: '40px' }}
        textAlign='center'
        textTransform='capitalize'
        pt={3}>
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
      <SimpleGrid minChildWidth='200px' spacing='1rem' px={{ base: '2', md: '8' }} mb={4} pt={3}>
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
