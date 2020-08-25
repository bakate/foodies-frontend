import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { InputStyles } from './Input'

const SelectStyles = styled(InputStyles)`
  display: grid;
`

const Select = ({ items, onInput, id }) => {
  const [selected, setSelected] = useState('')
  const selectHandler = (e) => {
    let validate = false
    setSelected(e.target.value)
    (validate)
    validate = true
    onInput(id, selected, validate)
  }

  return (
    <SelectStyles>
      <label htmlFor={id}>{id}</label>
      <select onChange={selectHandler} id={id}>
        {items.map((item, id) => (
          <option key={id} value={item}>
            {item}
          </option>
        ))}
      </select>
    </SelectStyles>
  )
}

Select.propTypes = {
  items: PropTypes.array,
  onInput: PropTypes.func,
  id: PropTypes.string,
}

export default Select
