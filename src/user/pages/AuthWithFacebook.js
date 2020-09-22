import { Button } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebookF } from 'react-icons/fa'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const AuthWithFacebook = () => {
  const { login } = useInfos()
  const { sendRequest } = useHttpClient()

  const responseFacebook = ({ accessToken, userID }) => {
    sendFacebookToken(userID, accessToken)
  }

  const sendFacebookToken = async (userID, accessToken) => {
    try {
      const { userId, token, username } = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/auth/facebooklogin`,
        'POST',
        JSON.stringify({
          userID,
          accessToken,
        }),
        { 'Content-Type': 'application/json' }
      )
      cogoToast.success(`Hello ${username} !`)
      login(userId, token)
    } catch (error) {
      cogoToast.error(error.message)
    }
  }

  return (
    <FacebookLogin
      appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
      autoLoad={false}
      callback={responseFacebook}
      render={({ onClick }) => (
        <Button onClick={onClick} colorScheme='blue' variant='outline' leftIcon={<FaFacebookF />}>
          via Facebook
        </Button>
      )}
    />
  )
}

export default AuthWithFacebook
