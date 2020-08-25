import styled, { createGlobalStyle } from 'styled-components'

// Define what props.theme will look like
export const theme = {
  black: '#222',
  mainGrey: '#ececec',
  white: '#fff',
  darkGrey: '#afafaf',
  lightError: '#f44336',
  error: '#bd0303',
  primary: '#ffab40',
  primaryLight: '#ffdd71',
  primaryDark: '#c77c02',
  secondary: '#aeea00',
  secondaryLight: '#e4ff54',
  secondaryDark: '#79b700',
  fullWidth: '1200px',
  smallWidth: '85vw',
  maxWidth: '40rem',
  mainTransition: 'all 0.3s ease-in-out',
  mainSpacing: '0.3rem',
  lightShadow: '2px 5px 3px 0px rgba(0, 0, 0, 0.5)',
  darkShadow: '4px 10px 5px 0px rgba(0, 0, 0, 0.5)',
  mainBorderRadius: '0.5rem',
}

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.7rem;
    line-height: 2;
font-family: 'Red Rose', cursive;
  }

  h1,h2,h3,h4,h5,h6{
    font-family: 'Solway', serif;
    margin-bottom: 1.25rem;
    letter-spacing:  ${({ theme }) => theme.mainSpacing};
  }
  ul {
  margin: 0;
  padding:0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${'' /* place-content: center;
  place-items: center; */}
   list-style: none;
  }
   li, button {
    margin: 1rem;
    text-transform: uppercase;
  }
  a, button {
    ${'' /* border: 1px solid transparent; */}
    text-decoration: none;
    color: ${theme.black};
    text-align:center;
    padding: 10px;
    &:hover, &:active{
      color: ${theme.black}
      border: 1px solid ${({ theme }) => theme.grey};
      background: ${({ theme }) => theme.primaryLight};
      overflow:hidden;
    }
  }
  p {
    margin-bottom: 1.25rem;
  }
  img {
    width: 100%;
    display: block;
  }
  input, textarea, label {
        font-family: 'Solway', serif;
     display: block;
  }


.center {
  display: grid;
  place-content:center;
  place-items:center;
}

.slide-in-left-enter {
  transform: translateX(-100%);
}

.slide-in-left-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: all 200ms;
}

.slide-in-left-exit {
  transform: translateX(0%);
  opacity: 1;
}

.slide-in-left-exit-active {
  transform: translateX(-100%);
  opacity: 0;
  transition: all 200ms;
}
.modal-enter {
    transform: translateY(-10rem);
    opacity: 0;
  }

  .modal-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: all 200ms;
  }

  .modal-exit {
    transform: translateY(0);
    opacity: 1;
  }

 .modal-exit-active {
    transform: translateY(-10rem);
    opacity: 0;
    transition: all 200ms;
  }
`
export const Inner = styled.div`
  max-width: ${({ theme }) => theme.fullWidth};
  margin: 4rem auto 0 auto;
  padding: 1rem;
`

export const StyledPage = styled.div`
  background: ${({ theme }) => theme.mainGrey};
  color: ${({ theme }) => theme.black};
`

//   .btn,
//   .btn-white,
//   .btn-primary {
//     text-transform: uppercase;
//     letter-spacing: var(--mainSpacing);
//     color: var(--primaryColor);
//     border: 2px solid var(--primaryColor);
//     padding: 0.45rem 0.8rem;
//     display: inline-block;
//     transition: var(--mainTransition);
//     cursor: pointer;
//     font-size: 0.8rem;
//     background: transparent;
//     border-radius: var(--mainBorderRadius);
//     display: inline-block;
//   }
//   .btn:hover {
//     background: var(--primaryColor);
//     color: var(--mainWhite);
//   }
//   .btn-white {
//     background: transparent;
//     color: var(--mainWhite);
//     border-color: var(--mainWhite);
//   }
//   .btn-white:hover {
//     background: var(--mainWhite);
//     color: var(--primaryColor);
//   }
//   .btn-primary {
//     background: var(--primaryColor);
//     color: var(--mainWhite);
//     border-color: var(--primaryColor);
//   }
//   .btn-primary:hover {
//     background: transparent;
//     color: var(--primaryColor);
//   }
//   .btn-block {
//     width: 100%;
//     display: block;
//     margin: 0 auto;
//     box-shadow: var(--lightShadow);
//     text-align: center;
//   }
//   .btn-details {
//     padding: 0.25rem 0.4rem;
//   }
//   .btn-details:hover {
//     background: var(--primaryLightColor);
//     border-color: var(--primaryLightColor);
//   }
//   /*
// ======
// Navbar
// ======
// */
//   .navbar {
//     background: var(--mainWhite);
//     height: 5rem;
//     display: flex;
//     align-items: center;
//     border-bottom: 2px solid var(--primaryColor);
//     box-shadow: var(--lightShadow);
//   }
//   .nav-center {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: var(--smallWidth);
//     margin: 0 auto;
//     max-width: var(--fullWidth);
//   }
//   .nav-links {
//     display: flex;
//     align-items: center;
//   }
//   .nav-links a {
//     text-transform: capitalize;
//     display: inline-block;
//     font-weight: bold;
//     margin-right: 0.5rem;
//     font-weight: 400;
//     letter-spacing: 2px;
//     font-size: 1.2rem;
//     padding: 0.25rem 0.5rem;
//     transition: var(--mainTransition);
//   }
//   .nav-links a:hover {
//     color: var(--primaryColor);
//   }
//   .logo {
//     width: 12rem;
//   }
//   /*
// ======
// About
// ======
// */
//   .about-section {
//     width: var(--smallWidth);
//     max-width: var(--maxWidth);
//     margin: 0 auto;
//   }
//   .about-section p {
//     line-height: 2rem;
//     font-weight: 400;
//     letter-spacing: 2px;
//   }
//   /*
// ======
// Error
// ======
// */
//   .error-page {
//     display: flex;
//     justify-content: center;
//   }
//   .error-container {
//     text-align: center;
//     text-transform: capitalize;
//   }
//   /*
// ======
// Cocktails List
// ======
// */

//   .section {
//     padding: 4rem 0;
//   }
//   .section-title {
//     font-size: 2rem;
//     text-transform: capitalize;
//     letter-spacing: var(--mainSpacing);
//     text-align: center;
//     margin-bottom: 3.5rem;
//     margin-top: 1rem;
//   }
//   .cocktails-center {
//     width: var(--smallWidth);
//     margin: 0 auto;
//     max-width: var(--fullWidth);
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(370.8px, 1fr));
//     column-gap: 1.8rem;
//     row-gap: 1.8rem;
//     /* align-items: start; */
//   }
//   /*
// ======
// Cocktail
// ======
// */

//   .cocktail {
//     background: var(--mainWhite);
//     margin-bottom: 2rem;
//     box-shadow: var(--lightShadow);
//     transition: var(--mainTransition);
//     display: grid;
//     grid-template-rows: auto 1fr;
//     border-radius: var(--mainBorderRadius);
//   }
//   .cocktail:hover {
//     box-shadow: var(--darkShadow);
//   }
//   .cocktail img {
//     border-top-left-radius: var(--mainBorderRadius);
//     border-top-right-radius: var(--mainBorderRadius);
//   }
//   .cocktail-footer {
//     padding: 1.5rem;
//   }
//   .cocktail-footer h3,
//   .cocktail-footer h4,
//   .cocktail-footer p {
//     margin-bottom: 0.3rem;
//   }
//   .cocktail-footer h3 {
//     font-size: 2.2rem;
//   }
//   .cocktail-footer p {
//     color: var(--darkGrey);
//     margin-bottom: 0.5rem;
//   }
//   /*
// ======
// Form
// ======
// */

//   .form {
//     width: var(--smallWidth);
//     margin: 0 auto;
//     max-width: var(--maxWidth);
//   }

//   .search-form {
//     background: var(--mainWhite);
//     padding: 1.25rem 1rem;
//     text-transform: capitalize;
//     border-radius: var(--mainBorderRadius);
//     box-shadow: var(--lightShadow);
//   }

//   .form-control label {
//     display: block;
//     margin-bottom: 0.5rem;
//     color: var(--primaryColor);
//   }
//   .form-control input {
//     width: 100%;
//     border: none;
//     border: 2px solid var(--darkGrey);
//     border-radius: var(--mainBorderRadius);
//     padding: 0.5rem;
//     font-size: 1.2rem;
//   }
//   /*
// ======
// Cocktail
// ======
// */

//   .cocktail-section {
//     text-align: center;
//   }
//   .drink {
//     width: var(--smallWidth);
//     max-width: var(--fullWidth);
//     margin: 0 auto;
//     text-align: left;
//   }
//   .drink img {
//     border-radius: var(--mainBorderRadius);
//   }
//   .drink p {
//     font-weight: bold;
//     text-transform: capitalize;
//   }
//   .drink span {
//     margin-right: 0.5rem;
//   }
//   .drink-info {
//     padding-top: 2rem;
//   }
//   @media screen and (min-width: 992px) {
//     .drink {
//       display: grid;
//       grid-template-columns: 2fr 3fr;
//       gap: 3rem;
//       align-items: center;
//     }
//     .drink-info {
//       padding-top: 0;
//     }
//   }
// `
