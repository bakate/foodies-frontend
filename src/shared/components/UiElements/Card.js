import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

export const CardStyles = styled.div`
  margin: 0;
  box-shadow: ${({ theme }) => theme.lightShadow};
  border-radius: ${({ theme }) => theme.mainBorderRadius};
  padding: 1rem;
  overflow: hidden;
  background: ${({ theme }) => theme.white};
`

const Card = ({ children }) => {
  return <CardStyles>{children}</CardStyles>
}

Card.propTypes = {
  children: PropTypes.any,
}

export default Card
