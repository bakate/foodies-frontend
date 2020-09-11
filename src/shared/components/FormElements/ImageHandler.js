import { Box, Button, Center, Grid, Image, Input } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import LoadingSpinner from '../UiElements/LoadingSpinner'

const ImageHandler = ({ id, onInput, initialValue }) => {
  const inputRef = useRef()
  // const value = initialValue
  // const [image, setImage] = useState(value)
  const [previewUrl, setPreviewUrl] = useState(initialValue)
  const [loading, setLoading] = useState(false)
  const pickerHandler = () => {
    inputRef.current.click()
  }

  const imageHandler = async (e) => {
    const files = e.target && e.target.files

    let imagesLinks = {}
    let fileIsValid = false
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
      fileIsValid = true
      onInput(id, imagesLinks, fileIsValid)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box my={3}>
      {loading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      <Input
        type='file'
        ref={inputRef}
        name='upload-image'
        style={{ display: 'none' }}
        accept='.jpg,.png,.jpeg'
        id={id}
        onChange={imageHandler}
      />
      <Grid>
        <Center my={3}>
          {previewUrl && (
            <Image
              src={previewUrl}
              borderRadius='full'
              objectFit='cover'
              boxSize='200px'
              alt='Preview'
            />
          )}
        </Center>
        <Button colorScheme='blue' variant='outline' onClick={pickerHandler}>
          Choisissez une autre photo
        </Button>
        {!previewUrl && <p>Choisissez une image, svp</p>}
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
