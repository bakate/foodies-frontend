import React from 'react'
import styled from 'styled-components'

const LoadingStyles = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;

  &:after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.primaryDark};
    border-color: ${({ theme }) => theme.primaryDark} transparent
      ${({ theme }) => theme.primaryDark} transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  & .loading-spinner__overlay {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingSpinner = ({ asOverlay }) => {
  return (
    <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
      <LoadingStyles />
    </div>
  )
}

export default LoadingSpinner
