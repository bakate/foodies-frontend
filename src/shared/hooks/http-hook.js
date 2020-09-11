import { useCallback, useEffect, useRef, useState } from 'react'

export const useHttpClient = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const activeHttpReq = useRef([])
  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true)
    const httpAbortCtrl = new AbortController()
    activeHttpReq.current.push(httpAbortCtrl)
    try {
      const response = await (
        await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        })
      ).json()
      if (!response.success) {
        throw new Error(response.message)
      }
      setIsLoading(false)
      return response
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
      throw err
    }
  }, [])
  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      activeHttpReq.current.forEach((item) => {
        item.abort()
      })
    }
  }, [])
  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  }
}
