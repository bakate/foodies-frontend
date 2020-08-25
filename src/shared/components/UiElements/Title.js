import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const TitleStyles = styled.div`
  div {
    display: grid;
    grid-template-rows: 1fr;
    place-items: ${(props) => (props.centerTitle ? 'center' : 'start')};
    h1,
    h2 {
      text-transform: capitalize;
    }
    hr {
      height: ${(props) => (props.hr ? '0.4rem' : '0')};
      width: ${(props) => (props.hr ? '8rem' : '0')};
      background: ${(props) => (props.hr ? props.theme.primary : 'none')};
      margin: ${(props) => (props.centerTitle ? '0 auto' : '0')};
    }
  }
`

const Title = ({ bgTitle, center, title, withRow }) => (
  <TitleStyles centerTitle={center} hr={withRow}>
    <div>
      <h1>{bgTitle}</h1>
      <h2>{title}</h2>
      <hr />
    </div>
  </TitleStyles>
)

Title.propTypes = {
  center: PropTypes.bool,
  title: PropTypes.string,
  withRow: PropTypes.bool,
  bgTitle: PropTypes.string,
}

export default Title
