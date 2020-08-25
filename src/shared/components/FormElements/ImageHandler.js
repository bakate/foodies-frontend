import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import LoadingSpinner from '../UiElements/LoadingSpinner'
import Button from './Button'
import { InputStyles } from './Input'

const ImageStyles = styled(InputStyles)`
  img {
    margin-top: 1rem;
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.mainBorderRadius};
    box-shadow: ${({ theme }) => theme.lightShadow};
  }
`

const ImageHandler = ({ id, onInput }) => {
  const inputRef = useRef()
  //  const {setImagesFiles, imageFiles} = useInfos({});
  const [previewUrl, setPreviewUrl] = useState()
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

      // setImagesFiles({regularImage:transformedImages.secure_url, largeImage:transformedImages.eager[0].secure_url})
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
    <ImageStyles>
      {loading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      <input
        type='file'
        ref={inputRef}
        name='upload-image'
        style={{ display: 'none' }}
        accept='.jpg,.png,.jpeg'
        id={id}
        onChange={imageHandler}
      />
      <div className='center'>
        {previewUrl && <img src={previewUrl} width='250' alt='Preview' />}
        <Button inverse type='button' onClick={pickerHandler}>
          select an image
        </Button>
        {!previewUrl && <p>Choisissez une image, svp</p>}
      </div>
    </ImageStyles>
  )
}

ImageHandler.propTypes = {
  id: PropTypes.string,
  onInput: PropTypes.func,
}

export default ImageHandler
