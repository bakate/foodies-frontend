import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ButtonStyles = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.mainBorderRadius};
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.black};
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  &:disabled,
  &:hover:disabled,
  &:active:disabled {
    background: ${({ theme }) => theme.mainGrey};
    color: ${({ theme }) => theme.black};
    border: 2px solid ${({ theme }) => theme.darkGrey};
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
  &:hover,
  &:active {
    background: ${({ theme }) => theme.secondaryDark};
    border-color: ${({ theme }) => theme.secondaryDark};
  }

  background: ${(props) => (props.inverse ? 'transparent' : 'null')};
  color: ${(props) => (props.inverse ? props.theme.secondaryDark : 'null')};
  &:hover,
  &:active {
    color: ${({ theme }) => theme.black};
    background: ${({ theme }) => theme.secondary};
  }

  background: ${(props) => (props.danger ? props.theme.error : 'null')};
  border-color: ${(props) => (props.danger ? props.theme.error : 'null')};
  color: ${(props) => (props.danger ? props.theme.white : 'null')};
  &:hover,
  &:active {
    background: ${(props) => (props.danger ? props.theme.lightError : 'null')};
    border-color: ${(props) => (props.danger ? props.theme.lightError : 'null')};
  }

  font-size: ${(props) => (props.big ? '2.2rem' : 'null')};
`

const Button = ({ href, inverse, danger, to, exact, big, type, onClick, disabled, children }) => {
  if (href) {
    return (
      <ButtonStyles>
        <a inverse={inverse} danger={danger} href={href} big={big}>
          {children}
        </a>
      </ButtonStyles>
    )
  }
  if (to) {
    return (
      <ButtonStyles as={Link} to={to} danger={danger} inverse={inverse} exact={exact}>
        {children}
      </ButtonStyles>
    )
  }
  return (
    <ButtonStyles
      big={big}
      inverse={inverse}
      danger={danger}
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </ButtonStyles>
  )
}

Button.propTypes = {
  big: PropTypes.bool,
  children: PropTypes.any,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  exact: PropTypes.bool,
  href: PropTypes.any,
  inverse: PropTypes.any,
  onClick: PropTypes.any,
  to: PropTypes.any,
  type: PropTypes.any,
}

export default Button
