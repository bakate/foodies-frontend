import React from 'react'
import { FaUserSecret } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useInfos } from '../../context'
const NavLinkStyles = styled.ul`
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    li {
      margin: 0 0.5rem;
      color: ${({ theme }) => theme.black};
      font-weight: 500;
    }
  }
`

const NavLinks = () => {
  const { token, logout, userId } = useInfos()
  return (
    <NavLinkStyles>
      <li>
        <NavLink to='/' exact>
          les recettes
        </NavLink>
      </li>
      {!!token && (
        <li>
          <NavLink to={`/${userId}/recipes`}>mes recettes</NavLink>
        </li>
      )}
      {!!token && (
        <li>
          <NavLink to='/recipes/new'>cr&eacute;er une recette</NavLink>
        </li>
      )}
      {!token && (
        <li>
          <NavLink to='/auth'>connexion</NavLink>
        </li>
      )}
      {!!token && (
        <li>
          <NavLink to={`/profile/${userId}`}>
            <FaUserSecret />
          </NavLink>
        </li>
      )}
      {!!token && (
        <li>
          <button onClick={logout}>se d&eacute;connecter</button>
        </li>
      )}
    </NavLinkStyles>
  )
}

export default NavLinks
