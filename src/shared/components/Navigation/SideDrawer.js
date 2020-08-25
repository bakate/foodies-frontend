import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const SideDrawerStyles = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  color: ${({ theme }) => theme.secondary};
  width: 60%;
  background: ${({ theme }) => theme.secondary};
  box-shadow: ${({ theme }) => theme.darkShadow};
`

const SideDrawer = ({ show, onClick, children }) => {
  const content = (
    <CSSTransition in={show} timeout={200} classNames='slide-in-left' mountOnEnter unmountOnExit>
      <SideDrawerStyles onClick={onClick}>{children}</SideDrawerStyles>
    </CSSTransition>
  )

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
}

export default SideDrawer
