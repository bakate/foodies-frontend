import { Button, ButtonGroup } from '@chakra-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useInfos } from '../../shared/context'

const Pagination = ({ latestData, resolvedData }) => {
  const { setPage } = useInfos()
  return (
    <ButtonGroup size='sm' d='flex' justifyContent='center' alignItems='center' py={3}>
      <Button
        _focus={{ outline: 'none' }}
        variant='ghost'
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        display={!latestData?.hasPrev && "none"}
        borderRadius='full'>
        Préc
      </Button>
      {Array.from({ length: resolvedData?.totalPages }, (_, i) => (
        <Button
          borderRadius='full'
          _focus={{ outline: 'none' }}
          key={i}
          onClick={() => setPage(i + 1)}
          colorScheme={i + 1 === latestData?.currentPage ? 'orange' : null}>
          {i + 1}
        </Button>
      ))}
      <Button
        borderRadius='full'
        _focus={{ outline: 'none' }}
        variant='ghost'
        onClick={() => setPage((old) => ( !latestData?.hasNext ? old : old + 1))}
        display={!latestData?.hasNext && "none"}>
        Suiv
      </Button>
    </ButtonGroup>
  )
}

Pagination.propTypes = {
  latestData: PropTypes.shape({
    currentPage: PropTypes.number,
    hasNext: PropTypes.bool,
    hasPrev: PropTypes.bool,
  }),
  resolvedData: PropTypes.shape({
    totalPages: PropTypes.number,
  }),
}

export default Pagination
