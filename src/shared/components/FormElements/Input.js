import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { validate } from '../../utils/validators'

const CHANGE = 'CHANGE'
const TOUCH = 'TOUCH'

export const InputStyles = styled.div`
  label {
    font-weight: bold;
    margin: 0.5rem;
    padding-top: 0.5rem;
    text-transform: capitalize;
  }

  input,
  textarea,
  select {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.mainGrey};
    background: ${({ theme }) => theme.white};
    margin-bottom: 3rem;
    font-size: 1.2em;
    border-radius: ${({ theme }) => theme.mainBorderRadius};
    &:hover,
    &:focus {
      outline: none;
      background: ${({ theme }) => theme.mainGrey};
      border-color: ${({ theme }) => theme.secondaryDark};
    }
  }

  &.invalid {
    p,
    label {
      color: ${({ theme }) => theme.error};
    }

    input,
    textarea {
      border: 2px solid ${({ theme }) => theme.lightError};
      opacity: 0.5;
    }
  }
`

const inputReducer = (state, action) => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      }
    case TOUCH: {
      return {
        ...state,
        isTouched: true,
      }
    }
    default:
      return state
  }
}

const Input = ({
  id,
  onInput,
  element,
  type,
  placeholder,
  rows,
  label,
  errorText,
  initialValue,
  initialValid,
  validators,
  items,
}) => {
  const initialValues = {
    value: initialValue || '',
    isTouched: false,
    isValid: initialValid || false,
  }
  const [inputState, dispatch] = useReducer(inputReducer, initialValues)

  const { value, isValid } = inputState

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  const changeHandler = (e) => {
    dispatch({
      type: CHANGE,
      val: e.target.value,
      validators,
    })
  }

  const touchHandler = () => {
    dispatch({
      type: TOUCH,
    })
  }

  const el =
    element === 'textarea' ? (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : element === 'select' ? (
      <select id={id} onChange={changeHandler} onBlur={touchHandler} value={inputState.value}>
        {items.map((item, id) => (
          <option key={id} value={item}>
            {item}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={id}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    )

  return (
    <InputStyles className={`${!inputState.isValid && inputState.isTouched && 'invalid'}`}>
      <label htmlFor={id}>{label}</label>
      {el}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </InputStyles>
  )
}

Input.propTypes = {
  element: PropTypes.string,
  errorText: PropTypes.string,
  id: PropTypes.string,
  initialValid: PropTypes.bool,
  initialValue: PropTypes.any,
  items: PropTypes.array,
  label: PropTypes.string,
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  type: PropTypes.string,
  validators: PropTypes.array,
}

export default Input
