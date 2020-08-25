import cogoToast from 'cogo-toast'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import ErrorMessage from '../../shared/components/UiElements/ErrorMessage'
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner'
import Title from '../../shared/components/UiElements/Title'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { VALIDATOR_EMAIL } from '../../shared/utils/validators'
import { AuthStyles } from './Auth'

const ResetToken = () => {
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const { formState, inputHandler } = useForm(
    {
      email: { value: '', isValid: false },
    },
    false
  )
  const authHandler = async (e) => {
    e.preventDefault()
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/auth/reset`,
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
        }),
        { 'Content-Type': 'application/json' }
      )
      cogoToast.info('Vérifier votre boite mail !')
      history.replace('/')
    } catch (err) {}
  }
  return (
    <>
      <ErrorMessage errorMessage={error} onClear={clearError} />
      <AuthStyles>
        {isLoading && (
          <div className='center'>
            <LoadingSpinner asOverlay />
          </div>
        )}
        <Title center withRow title='nouveau mot de passe:' />
        <form onSubmit={authHandler}>
          <Input
            id='email'
            placeholder='Votre email'
            label='e-mail'
            type='email'
            errorText='Renseignez un email valide'
            validators={[VALIDATOR_EMAIL()]}
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

export default ResetToken
