import cogoToast from 'cogo-toast'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner'
import Title from '../../shared/components/UiElements/Title'
import { useInfos } from '../../shared/context'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { VALIDATOR_MINLENGTH } from '../../shared/utils/validators'
import { AuthStyles } from './Auth'

const Reset = () => {
  const { login } = useInfos()
  const history = useHistory()
  const token = useParams().token
  const { isLoading, error, sendRequest } = useHttpClient()

  const { formState, inputHandler } = useForm(
    {
      password: { value: '', isValid: false },
      confirmPassword: { value: '', isValid: false },
    },
    false
  )
  const authHandler = async (e) => {
    e.preventDefault()
    try {
      const { token: newToken, userId } = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/auth/reset/${token}`,
        'POST',
        JSON.stringify({
          password: formState.inputs.password.value,
          confirmPassword: formState.inputs.confirmPassword.value,
        }),
        { 'Content-Type': 'application/json' }
      )
      cogoToast.success('Votre mot de passe a été réinitialisé !')
      login(userId, newToken)
      history.replace('/')
    } catch (err) {}
  }
  if (error) {
    cogoToast.error(error)
  }
  return (
    <>
      <AuthStyles>
        {isLoading && (
          <div className='center'>
            <LoadingSpinner asOverlay />
          </div>
        )}
        <Title center withRow title='nouveau mot de passe:' />
        <form onSubmit={authHandler}>
          <Input
            errorText='Choisissez un mot de passe avec au moins 6 caract&egrave;res'
            id='password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            type='password'
            label='nouveau mot de passe'
            onInput={inputHandler}
          />
          <Input
            errorText='Choisissez un mot de passe avec au moins 6 caract&egrave;res'
            id='confirmPassword'
            validators={[VALIDATOR_MINLENGTH(6)]}
            type='password'
            label='confirmez votre mot de passe'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid || isLoading}>
            soumettre
          </Button>
        </form>
      </AuthStyles>
    </>
  )
}

export default Reset
