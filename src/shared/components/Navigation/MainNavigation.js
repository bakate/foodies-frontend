import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Backdrop from '../UiElements/Backdrop'
import Nav from './Nav'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'

const MainNavigationStyles = styled.div`
  .main-navigation__menu-btn {
    width: 4rem;
    height: 4rem;
    background: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 2rem;
    cursor: pointer;
  }

  .main-navigation__menu-btn span {
    display: block;
    width: 3rem;
    height: 2.5px;
    background: white;
  }

  .main-navigation__title {
    color: white;
    margin-top: 0.4rem;
  }

  .main-navigation__header-nav {
    display: none;
  }

  .main-navigation__drawer-nav {
    height: 100%;
  }

  @media (min-width: 768px) {
    .main-navigation__menu-btn {
      display: none;
    }

    .main-navigation__header-nav {
      display: block;
    }
    .main-navigation__title {
      margin: 0.2rem;
      padding: 0.8rem;
      line-height: 2.3rem;
    }
  }
`

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const openDrawerHandler = () => {
    setDrawerIsOpen(true)
  }

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false)
  }

  return (
    <MainNavigationStyles>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks />
        </nav>
      </SideDrawer>

      <Nav>
        <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className='main-navigation__title'>
          <Link to='/'>Foodies</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </Nav>
    </MainNavigationStyles>
  )
}

export default MainNavigation
