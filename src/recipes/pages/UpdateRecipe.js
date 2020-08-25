import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import RichText from '../../shared/components/FormElements/RichText'
import ErrorMessage from '../../shared/components/UiElements/ErrorMessage'
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner'
import Title from '../../shared/components/UiElements/Title'
import { useInfos } from '../../shared/context'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import { NewRecipeStyles } from './NewRecipe'

const UpdateRecipe = () => {
  const [recipeToUpdate, setRecipeToUpdate] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const recipeId = useParams().recipeId
  const history = useHistory()
  const { token, userId } = useInfos()

  const { formState, inputHandler, setFormData } = useForm(
    {
      title: { value: null, isValid: false },
      ingredients: { value: null, isValid: false },
      cooking: { value: null, isValid: false },
      duration: { value: null, isValid: false },
    },
    false
  )
  useEffect(() => {
    const fetchRecipeToUpdate = async () => {
      const { recipe } = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/${recipeId}`
      )
      setRecipeToUpdate(recipe)
      setFormData({
        title: { value: recipe.title, isValid: true },
        ingredients: { value: recipe.ingredients, isValid: true },
        cooking: { value: recipe.cooking, isValid: true },
        duration: { value: recipe.duration, isValid: true },
      })
    }
    fetchRecipeToUpdate()
  }, [recipeId, setFormData, setRecipeToUpdate, sendRequest])

  const formHandler = async (e) => {
    const { title, cooking, ingredients, duration } = formState.inputs
    e.preventDefault()
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/${recipeId}`,
        'PATCH',
        JSON.stringify({
          title: title.value,
          ingredients: ingredients.value,
          cooking: cooking.value,
          duration: duration.value,
        }),
        { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      )
      history.replace(`/${userId}/recipes`)
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
      {!isLoading && recipeToUpdate && (
        <NewRecipeStyles>
          <Title center withRow title='Modifier votre recette' />
          <form onSubmit={formHandler}>
            <Input
              id='title'
              label='titre'
              initialValue={recipeToUpdate.title}
              initialValid={true}
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Fournissez un titre valide, svp'
            />

            <RichText
              id='ingredients'
              onInput={inputHandler}
              initialValue={recipeToUpdate.ingredients}
            />

            <RichText id='cooking' onInput={inputHandler} initialValue={recipeToUpdate.cooking} />
            <Input
              label='dur&eacute;e (mins)'
              id='duration'
              initialValue={recipeToUpdate.duration}
              type='number'
              onInput={inputHandler}
              initialValid={true}
              errorText='Renseignez la dur&eacute;e'
              validators={[VALIDATOR_REQUIRE()]}
            />

            <Button type='submit' disabled={!formState.isValid} center>
              modifier
            </Button>
          </form>
        </NewRecipeStyles>
      )}
    </>
  )
}

export default UpdateRecipe
