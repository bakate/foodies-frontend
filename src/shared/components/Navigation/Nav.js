import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const NavStyles = styled.nav`
  width: 100%;
  height: 6rem;
  display: flex;
  place-items: center;
  /* position: fixed; */
  top: 0;
  left: 0;
  color: ${({ theme }) => theme.black};
  background: ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => theme.bShadow};
  padding: 2rem;
  z-index: 5;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`

const Nav = ({ children }) => {
  return <NavStyles>{children}</NavStyles>
}

Nav.propTypes = {
  children: PropTypes.any,
}

export default Nav
