import cogoToast from 'cogo-toast'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../shared/components/FormElements/Button'
import ImageHandler from '../../shared/components/FormElements/ImageHandler'
import Input from '../../shared/components/FormElements/Input'
import { CardStyles } from '../../shared/components/UiElements/Card'
import ErrorMessage from '../../shared/components/UiElements/ErrorMessage'
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner'
import Title from '../../shared/components/UiElements/Title'
import { useInfos } from '../../shared/context'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/utils/validators'

export const AuthStyles = styled(CardStyles)`
  width: 100%;
  max-width: 45rem;
  margin: 3rem auto;
  padding-top: 0;
`

const Auth = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { login } = useInfos()
  const [inLogInMode, setInLogInMode] = useState(true)

  const { formState, inputHandler, setFormData } = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  )

  const switchModeHandler = () => {
    if (!inLogInMode) {
      setFormData(
        {
          ...formState.inputs,
          username: undefined,
          images: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: { value: '', isValid: false },
          images: { value: null, isValid: false },
        },
        false
      )
    }
    setInLogInMode((prev) => !prev)
  }
  const authHandler = async (e) => {
    e.preventDefault()
    if (inLogInMode) {
      try {
        const { userId, token } = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        )
        cogoToast.success('Ravi de vous revoir !')
        login(userId, token)
      } catch (err) {}
    } else {
      try {
        const { token, userId } = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
          'POST',
          JSON.stringify({
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            images: formState.inputs.images.value,
          }),
          { 'Content-Type': 'application/json' }
        )
        cogoToast.success('Bienvenue parmi nous !')
        login(userId, token)
      } catch (err) {}
    }
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
        <Title center withRow title={inLogInMode ? 'se connecter' : "s'inscrire"} />
        <form onSubmit={authHandler}>
          {!inLogInMode && <ImageHandler id='images' onInput={inputHandler} />}
          {!inLogInMode && (
            <Input
              id='username'
              placeholder="nom d'utilisateur"
              label='username'
              errorText="Renseignez un nom d'utilisateur"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          )}
          <Input
            errorText='Fournissez une adresse mail valide'
            id='email'
            validators={[VALIDATOR_EMAIL()]}
            placeholder='Votre email'
            label='e-mail'
            type='email'
            onInput={inputHandler}
          />
          <Input
            errorText='Choisissez un mot de passe avec au moins 6 caract&egrave;res'
            id='password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            placeholder='Votre mot de passe'
            type='password'
            label='mot de passe'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid || isLoading}>
            valider
          </Button>
          <Button type='button' inverse onClick={switchModeHandler}>
            ou {inLogInMode ? "s'inscrire" : 'se connecter'}
          </Button>
          {inLogInMode && (
            <Link to='/reset' style={{ background: 'none' }}>
              <p>Mot de Passe oubli&eacute; ?</p>
            </Link>
          )}
        </form>
      </AuthStyles>
    </>
  )
}

export default Auth
