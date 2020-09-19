import { Button, ButtonGroup, Grid } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import Title from '../../Chakra/Heading'
import InputField from '../../Chakra/InputField'
import Spinner from '../../Chakra/Spinner'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const UpdateRecipe = () => {
  const [recipeToUpdate, setRecipeToUpdate] = useState({
    title: '',
    ingredients: '',
    cooking: '',
    duration: '',
  })
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const recipeId = useParams().recipeId
  const history = useHistory()
  const { token, userId } = useInfos()

  useEffect(() => {
    const fetchRecipeToUpdate = async () => {
      const { recipe } = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/${recipeId}`
      )
      setRecipeToUpdate(recipe)
    }
    fetchRecipeToUpdate()
  }, [recipeId, setRecipeToUpdate, sendRequest])

  useEffect(() => {
    if (error) {
      const { hide } = cogoToast.error(error, {
        hideAfter: 4,
        onClick: () => {
          hide()
        },
      })
    }
    return () => {
      return clearError()
    }
  }, [error, clearError])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      {!isLoading && (
        <>
          <Title title='Modifier votre recette' my='1rem' dir='column' wrap='no-wrap' />

          <Formik
            initialValues={recipeToUpdate}
            enableReinitialize='true'
            validationSchema={Yup.object({
              title: Yup.string().required('Fournissez un nom de recette'),
              ingredients: Yup.string().required('Fournissez la liste des ingrédients'),
              cooking: Yup.string().required('Renseignez les différentes étapes de préparation.'),
              duration: Yup.number().required('la durée ?'),
            })}
            onSubmit={async ({ title, cooking, ingredients, duration }) => {
              try {
                await sendRequest(
                  `${process.env.REACT_APP_BACKEND_URL}/recipes/${recipeId}`,
                  'PATCH',
                  JSON.stringify({
                    title,
                    ingredients,
                    cooking,
                    duration,
                  }),
                  { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                )
                history.replace(`/${userId}/recipes`)
              } catch (err) {}
            }}>
            {({ isSubmitting }) => (
              <Form>
                <Grid my={{ md: '4rem' }} mx='auto' maxW='650px'>
                  <InputField name='title' label='Titre' />
                  <InputField name='ingredients' element='textarea' label='Ingr&eacute;dients' />
                  <InputField name='cooking' element='textarea' label='Pr&eacute;paration' />
                  <InputField type='number' name='duration' label='Temps' />
                  <ButtonGroup d='flex' justifyContent='flex-start' my={3}>
                    <Button onClick={() => history.goBack()}>annuler</Button>
                    <Button
                      type='submit'
                      isLoading={isSubmitting}
                      colorScheme='teal'
                      loadingText='En Cours'>
                      modifier
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  )
}

export default UpdateRecipe
