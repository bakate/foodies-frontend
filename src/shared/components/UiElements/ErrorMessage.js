import PropTypes from 'prop-types'
import React from 'react'
import Button from '../FormElements/Button'
import Modal from './Modal'

const ErrorModal = ({ onClear, errorMessage }) => {
  return (
    <Modal
      onCancel={onClear}
      header="Oups! Une erreur s'est produite!"
      show={!!errorMessage}
      footer={<Button onClick={onClear}>Okay</Button>}>
      <p>{errorMessage}</p>
    </Modal>
  )
}

ErrorModal.propTypes = {
  errorMessage: PropTypes.string,
  onClear: PropTypes.func,
}

export default ErrorModal
