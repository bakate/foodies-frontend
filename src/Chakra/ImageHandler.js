import { Box, Button, Center, Grid, Image } from '@chakra-ui/core'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import Spinner from './Spinner'

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

    let imagesLinks = {}
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

      imagesLinks = {
        regularImage: transformedImages.secure_url,
        largeImage: transformedImages.eager[0].secure_url,
      }
      setPreviewUrl(transformedImages.secure_url)
      setValue(imagesLinks)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box my={3}>
      {loading && <Spinner />}
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
              boxSize='250px'
              alt='Preview'
            />
          )}
        </Center>
        <Center>
          <Button colorScheme='blue' variant='outline' onClick={pickerHandler}>
            {loading ? 'Transformation en Cours' : 'Choisissez une  photo'}
          </Button>
        </Center>
      </Grid>
    </Box>
  )
}

ImageHandler.propTypes = {
  id: PropTypes.string,
  onInput: PropTypes.func,
  initialValue: PropTypes.string,
}

export default ImageHandler
