import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CancelPage = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-image: url('/images/g5.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CancelContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  color: #fecb00;
  text-align: center;
  max-width: 500px;
  width: 100%;
`

const CancelIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f44336;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: white;
`

const CancelTitle = styled.h1`
  color: #fecb00;
  margin-bottom: 20px;
  font-size: 2rem;
`

const CancelMessage = styled.p`
  color: #fecb00;
  margin-bottom: 30px;
  line-height: 1.6;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`

const ActionBtn = styled(Link)`
  background: #fecb00;
  color: #000;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e6b800;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(254, 203, 0, 0.4);
  }
`

const PaymentCancel = () => {
  return (
    <CancelPage>
      <CancelContainer>
        <CancelIcon>✕</CancelIcon>
        <CancelTitle>Payment Cancelled</CancelTitle>
        <CancelMessage>
          Your payment has been cancelled. No charges have been made to your account. 
          You can try again or contact us if you need assistance.
        </CancelMessage>
        
        <ActionButtons>
          <ActionBtn to="/cart">Return to Cart</ActionBtn>
          <ActionBtn to="/">Continue Shopping</ActionBtn>
          <ActionBtn to="/contact">Contact Support</ActionBtn>
        </ActionButtons>
      </CancelContainer>
    </CancelPage>
  )
}

export default PaymentCancel 