import { Box } from '@chakra-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Title from '../../Chakra/Heading'
import Button from '../../shared/components/FormElements/Button'
import ImageHandler from '../../shared/components/FormElements/ImageHandler'
import Input from '../../shared/components/FormElements/Input'
import RichText from '../../shared/components/FormElements/RichText'
import ErrorMessage from '../../shared/components/UiElements/ErrorMessage'
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner'
import { useInfos } from '../../shared/context'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import { AuthStyles } from '../../user/pages/Auth'

export const NewRecipeStyles = styled(AuthStyles)`
  max-width: 80rem;
`
const NewRecipe = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { token } = useInfos()
  const history = useHistory()
  const { formState, inputHandler } = useForm(
    {
      title: { value: '', isValid: false },
      images: { value: null, isValid: false },
      ingredients: { value: null, isValid: false },
      cooking: { value: null, isValid: false },
      category: { value: '', isValid: false },
      difficulty: { value: '', isValid: false },
      duration: { value: '', isValid: false },
    },
    false
  )

  const formHandler = async (e) => {
    const { title, images, ingredients, cooking, category, difficulty, duration } = formState.inputs
    e.preventDefault()
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/recipes`,
        'POST',
        JSON.stringify({
          title: title.value,
          images: images.value,
          ingredients: ingredients.value,
          cooking: cooking.value,
          category: category.value,
          difficulty: difficulty.value,
          duration: duration.value,
        }),
        { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      )
      history.replace('/')
    } catch (err) {}
  }
  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    )
  }
  if (error) {
    return <ErrorMessage errorMessage={error} onClear={clearError} />
  }

  return (
    <>
      <Box maxW='60vw'>
        <Title title='ajouter une recette' />
        <form onSubmit={formHandler}>
          <Input
            id='title'
            placeholder='Choisir un titre'
            label='titre :'
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Fournissez un titre valide, svp'
          />
          <ImageHandler id='images' onInput={inputHandler} />
          <RichText id='ingredients' onInput={inputHandler} label='ingr&eacute;dients :' />

          <Input
            element='select'
            label='cat&eacute;gorie :'
            id='category'
            onInput={inputHandler}
            initialValue='entrée'
            initialValid
            items={['entrée', 'plat principal', 'aperitif et buffet', 'dessert']}
            errorText='Selectionnez une cat&eacute;gorie'
            validators={[VALIDATOR_REQUIRE()]}
          />
          <Input
            element='select'
            label='difficult&eacute; :'
            id='difficulty'
            onInput={inputHandler}
            initialValue='facile'
            initialValid
            items={['facile', 'moyen', 'difficile']}
            errorText='Selectionnez un niveau de difficult&eacute;'
            validators={[VALIDATOR_REQUIRE()]}
          />
          <RichText id='cooking' onInput={inputHandler} label='pr&eacute;paration :' />
          <Input
            label='dur&eacute;e (mins) :'
            id='duration'
            type='number'
            onInput={inputHandler}
            errorText='Renseignez la dur&eacute;e'
            validators={[VALIDATOR_REQUIRE()]}
          />

          <Button type='button' inverse onClick={() => history.push('/')}>
            annuler
          </Button>
          <Button type='submit' disabled={!formState.isValid}>
            valider
          </Button>
        </form>
      </Box>
    </>
  )
}

export default NewRecipe
