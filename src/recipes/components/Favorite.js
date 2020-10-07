import { Center, IconButton } from '@chakra-ui/core'
import React from 'react'
import { MdFavorite } from 'react-icons/md'
import { useInfos } from '../../shared/context'

const Favorite = (props) => {
  const { userId } = useInfos()
  return (
    <Center>
      {userId && (
        <IconButton
          aria-label='favorite button'
          icon={<MdFavorite />}
          colorScheme='red'
          variant='ghost'
          // d='flex'
          // justifySelf='center'
          // alignSelf='center'
          {...props}
        />
      )}

      {/* <IconButton
            aria-label='favorite button with border'
            variant='ghost'
            icon={<MdFavoriteBorder />}
          /> */}
    </Center>
  )
}

export default Favorite
