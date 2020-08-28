import cogoToast from 'cogo-toast'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import ImageHandler from '../../shared/components/FormElements/ImageHandler'
import Input from '../../shared/components/FormElements/Input'
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner'
import Title from '../../shared/components/UiElements/Title'
import { useInfos } from '../../shared/context'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import { AuthStyles } from './Auth'

const UpdateProfile = () => {
  const [userProfile, setUserProfile] = useState()
  const userId = useParams().userId
  const { isLoading, error, sendRequest } = useHttpClient()
  const { token } = useInfos()
  const history = useHistory()
  const { formState, inputHandler, setFormData } = useForm(
    {
      username: { value: '', isValid: false },
      images: { value: null, isValid: false },
    },
    false
  )

  useEffect(() => {
    const getUserInfos = async () => {
      try {
        const {
          user: { username, images },
        } = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/auth/profile/${userId}`)

        setUserProfile({ username, images })
        setFormData({
          username: { value: username, isValid: true },
          images: { value: images, isValid: true },
        })
      } catch (err) {}
    }
    getUserInfos()
  }, [sendRequest, userId, setFormData, token])

  const authHandler = async (e) => {
    e.preventDefault()
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/auth/profile/update/${userId}`,
        'PATCH',
        JSON.stringify({
          username: formState.inputs.username.value,
          images: formState.inputs.images.value,
        }),
        { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      )
      history.replace(`/${userId}/recipes`)
      cogoToast.success('Profil à jour !')
    } catch (err) {}
  }
  if (error) {
    cogoToast.error(error)
  }
  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    )
  }
  return (
    <>
      {!isLoading && userProfile && (
        <div>
          <Title withRow title='mes informations' center />
          <AuthStyles>
            <form onSubmit={authHandler}>
              <ImageHandler
                id='images'
                onInput={inputHandler}
                initialValue={userProfile.images.regularImage}
              />
              <Input
                id='username'
                placeholder="nom d'utilisateur"
                label="nom d'utilisateur"
                initialValid
                initialValue={userProfile.username}
                errorText="Renseignez un nom d'utilisateur"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />

              <Button type='submit' disabled={!formState.isValid || isLoading}>
                soumettre
              </Button>
            </form>
          </AuthStyles>
        </div>
      )}
    </>
  )
}

export default UpdateProfile
