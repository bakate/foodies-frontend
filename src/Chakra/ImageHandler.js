import { Box, Button, Center, Grid, Image } from '@chakra-ui/core'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import DisplayLoader from './Spinner'

const ImageHandler = ({ id, initialValue, ...props }) => {
  const [, , helpers] = useField(props)
  const { setValue } = helpers
  const inputRef = useRef()

  const [previewUrl, setPreviewUrl] = useState(initialValue)
  const [loading, setLoading] = useState(false)
  const pickerHandler = () => {
    inputRef.current.click()
  }

  const imageHandler = async (e) => {
    const files = e.target && e.target.files

    // let imagesLink
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'fullstack')
    try {
      setLoading(true)
      const transformedImages = await (
        await fetch('https://api.cloudinary.com/v1_1/bakate/image/upload', {
          method: 'POST',
          body: data,
        })
      ).json()
      setPreviewUrl(transformedImages.secure_url)
      setValue(transformedImages.secure_url)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box my={3}>
      {loading && <DisplayLoader />}
      <input
        type='file'
        id={id}
        ref={inputRef}
        style={{ display: 'none' }}
        accept='.jpg,.png,.jpeg'
        onChange={imageHandler}
      />
      <Grid>
        <Center my={3}>
          {previewUrl && (
            <Image
              src={previewUrl}
              borderRadius='lg'
              objectFit='cover'
              ignoreFallback
              h='350px'
              w='100%'
              alt='Preview'
            />
          )}
        </Center>
        <Center>
          <Button
            colorScheme='blue'
            variant='outline'
            onClick={pickerHandler}
            isLoading={loading}
            loadingText='Changement en cours'>
            une nouvelle photo ?
          </Button>
        </Center>
      </Grid>
    </Box>
  )
}

ImageHandler.propTypes = {
  id: PropTypes.string,
  initialValue: PropTypes.string,
}

export default ImageHandler
