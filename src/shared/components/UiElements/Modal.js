import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import Backdrop from './Backdrop'

const ModalStyles = styled.div`
  z-index: 100;
  position: fixed;
  top: 16vh;
  left: 20%;
  width: 90%;
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.darkShadow};
  border-radius: ${({ theme }) => theme.mainBorderRadius};

  header {
    width: 100%;
    padding: 1rem 0.5rem;
    background: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.black};
  }

  .modal__content {
    padding: 1rem 0.5rem;
  }
  footer {
    padding: 1rem 0.5rem;
    text-align: ${(props) => (props.footerClass ? 'right' : 'center')};
  }

  @media (min-width: 768px) {
    left: calc(40% - 20rem);
    width: 70rem;
  }
`

const ModalOverlay = ({ header, onSubmit, children, footer }) => {
  const content = (
    <ModalStyles>
      <header>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className='modal__content'>{children}</div>
        <footer footerClass={footer}>{footer}</footer>
      </form>
    </ModalStyles>
  )
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames='modal'>
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  )
}

Modal.propTypes = {
  onCancel: PropTypes.func,
  show: PropTypes.any,
}

export default Modal
