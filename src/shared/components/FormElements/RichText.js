import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-react'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { InputStyles } from './Input'

const RichText = ({ onInput, id, initialValue, label }) => {
  const value = initialValue
  const [text, setText] = useState(value)
  const [valid, setValid] = useState(false)

  return (
    <InputStyles>
      <label htmlFor={id}>{label}</label>
      <CKEditor
        id={id}
        editor={ClassicEditor}
        data={text}
        onChange={(e, editor) => {
          const data = editor.getData()
          setText(data)
          setValid(true)
          onInput(id, text, valid)
        }}
      />
    </InputStyles>
  )
}

RichText.propTypes = {
  id: PropTypes.string,
  initialValue: PropTypes.func,
  onInput: PropTypes.func,
  label: PropTypes.string,
}

export default RichText
