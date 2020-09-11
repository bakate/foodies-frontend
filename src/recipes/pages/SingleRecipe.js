import { AspectRatio, Box, Button, Center, Flex, Grid, Image } from '@chakra-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Title from '../../Chakra/Heading'
import Typography from '../../Chakra/Typography'
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
    return <Title center title="oops, Quelque chose s'est mal passée" />
  }

  const transformedIngredients = (string) => {
    return string
      .replace(/(<([^>]+)>)/gi, '🥣')
      .replace(/&nbsp;/gi, '')
      .split('🥣')
      .map((el, i) => {
        if (el.length) {
          return <li key={i}>{el}</li>
        }
        return null
      })
  }

  const { hours, minutes } = getDuration(recipe.duration)

  return (
    <Box>
      <Flex justify='flex-start'>
        <Button
          type='button'
          onClick={() => history.push('/')}
          colorScheme='blue'
          variant='outline'>
          retour
        </Button>
      </Flex>
      <Grid>
        <Center mb={2}>
          <Title title={recipe.title} />
        </Center>
        <AspectRatio ratio={4 / 3} maxW='100vw' h='60vh' mb={3}>
          <Image src={recipe.images.largeImage} alt='recipe' objectFit='cover' w='100%' />
        </AspectRatio>
        <Grid
          px={4}
          mx='auto'
          templateColumns='repeat(auto-fit, minmax(200px, 1fr))'
          justifyContent='center'
          alignItems='flex-start'
          alignContent='center'>
          <Box>
            <Title title='ingr&eacute;dients :' />
            <ul className='content'>{transformedIngredients(recipe.ingredients)}</ul>
          </Box>
          <Box>
            <Title title='Pr&eacute;paration :' />
            <ol className='content'>{transformedIngredients(recipe.cooking)}</ol>
          </Box>
        </Grid>
        <Grid
          my={3}
          pb={3}
          templateColumns='repeat(auto-fit, minmax(200px, 1fr))'
          justifyContent='center'
          alignItems='center'>
          <Box>
            <Title title='Dur&eacute;e :' />
            <Typography>
              <h4>
                {' '}
                {hours > 1 ? `${hours} heures` : hours === 1 ? `${hours} heure` : null}
                {hours >= 1 && minutes > 0 && ` et ${minutes} minutes`}
                {!hours && minutes && `${minutes} minutes`}
              </h4>
            </Typography>
          </Box>
          <Box>
            <Title title='cat&eacute;gorie :' />
            <Typography text={recipe.category} />
          </Box>
          <Box>
            <Title title='recette publi&eacute;e le :' />
            <Typography>
              <h4>
                {new Date(recipe.published).toLocaleDateString('fr', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h4>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SingleRecipe
