import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`

const ModalContent = styled.div`
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #fecb00;
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(254, 203, 0, 0.3);
`

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(254, 203, 0, 0.3);
  border-top: 4px solid #fecb00;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto 20px;
`

const LoadingText = styled.p`
  color: #fecb00;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 500;
`

const LoadingModal = ({ isVisible, message = 'Loading...' }) => {
  if (!isVisible) return null

  return (
    <ModalOverlay>
      <ModalContent>
        <Spinner />
        <LoadingText>{message}</LoadingText>
      </ModalContent>
    </ModalOverlay>
  )
}

export default LoadingModal 