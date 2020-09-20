import cogoToast from 'cogo-toast'
import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

const AuthWithGoogle = () => {
  const { login } = useInfos()
  const { sendRequest } = useHttpClient()
  const onSuccess = async (res) => {
    await sendGoogleToken(res.tokenId)
  }

  const onFailure = (res) => {
    console.log(res)
  }

  const sendGoogleToken = async (idToken) => {
    try {
      const { token, userId, username } = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/auth/googlelogin`,
        'POST',
        JSON.stringify({
          idToken,
        }),
        { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` }
      )
      cogoToast.success(`Hello ${username} !`)
      login(userId, token)
    } catch (error) {
      cogoToast.error(error.message)
    }
  }
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText='Continuer avec Google'
      cookiePolicy={'single_host_origin'}
      onSuccess={onSuccess}
      onFailure={onFailure}
      style={{ marginTop: '100px' }}
      // isSignedIn={true}
    />
  )
}

export default AuthWithGoogle
