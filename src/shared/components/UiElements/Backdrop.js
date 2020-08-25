import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const BackDropStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`

const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <BackDropStyles onClick={onClick} />,
    document.getElementById('backdrop-hook')
  )
}

export default Backdrop
