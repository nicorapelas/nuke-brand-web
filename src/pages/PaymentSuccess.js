import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../utils/api'
import LoadingModal from '../components/LoadingModal'

const SuccessPage = styled.div`
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

const SuccessContainer = styled.div`
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

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: white;
`

const SuccessTitle = styled.h1`
  color: #fecb00;
  margin-bottom: 20px;
  font-size: 2rem;
`

const SuccessMessage = styled.p`
  color: #fecb00;
  margin-bottom: 30px;
  line-height: 1.6;
`

const OrderDetails = styled.div`
  background: rgba(254, 203, 0, 0.1);
  border: 2px solid #fecb00;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
`

const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const DetailLabel = styled.span`
  color: rgba(254, 203, 0, 0.8);
`

const DetailValue = styled.span`
  color: #fecb00;
  font-weight: bold;
`

const DeliverySection = styled.div`
  background: rgba(254, 203, 0, 0.1);
  border: 2px solid #fecb00;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
`

const DeliveryTitle = styled.h3`
  color: #fecb00;
  margin-bottom: 15px;
  font-size: 1.2rem;
`

const DeliveryInfo = styled.div`
  color: #fecb00;
  line-height: 1.6;
`

const DeliveryLine = styled.p`
  margin: 5px 0;
  color: #fecb00;
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

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        // Debug: Log all search parameters
        console.log('=== PAYMENT SUCCESS DEBUG ===')
        console.log('All search params:', Object.fromEntries(searchParams.entries()))
        console.log('m_payment_id:', searchParams.get('m_payment_id'))
        console.log('pf_payment_id:', searchParams.get('pf_payment_id'))
        console.log('payment_status:', searchParams.get('payment_status'))
        console.log('URL pathname:', window.location.pathname)
        console.log('Full URL:', window.location.href)
        console.log('================================')
        
        const orderId = searchParams.get('m_payment_id') || searchParams.get('pf_payment_id')
        console.log('Extracted order ID:', orderId)
        
        if (orderId) {
          console.log('Fetching order status for ID:', orderId)
          const response = await api.get(`/payments/status/${orderId}`)
          console.log('Order status response:', response.data)
          if (response.data.success) {
            console.log('Order found successfully:', response.data.order)
            setOrder(response.data.order)
          } else {
            console.log('Order not found in database')
            setError('Order not found')
          }
        } else {
          console.log('No order ID in URL parameters')
          // Try to get email from localStorage (set during checkout)
          const lastCheckoutEmail = localStorage.getItem('lastCheckoutEmail')
          console.log('Email from localStorage:', lastCheckoutEmail)
          
          if (lastCheckoutEmail) {
            console.log('No order ID, trying to fetch latest paid order for email:', lastCheckoutEmail)
            const response = await api.get(`/payments/latest-paid-order?email=${encodeURIComponent(lastCheckoutEmail)}`)
            console.log('Latest paid order response:', response.data)
            
            if (response.data.success) {
              console.log('Latest paid order found:', response.data.order)
              setOrder(response.data.order)
            } else {
              console.log('No recent paid order found for email')
              setError('No recent paid order found for your email. If you believe this is an error, please contact support.')
            }
          } else {
            console.log('No email found in localStorage')
            setError('No order ID or email found. If you believe this is an error, please contact support.')
          }
        }
      } catch (error) {
        console.error('Error fetching order status:', error)
        console.error('Error response:', error.response)
        console.error('Error status:', error.response?.status)
        console.error('Error data:', error.response?.data)
        setError('Failed to fetch order details')
      } finally {
        console.log('Setting loading to false')
        setLoading(false)
      }
    }

    fetchOrderStatus()
  }, [searchParams])

  if (loading) {
    return (
      <>
        <LoadingModal isVisible={true} message="Confirming payment..." />
        <div>Loading...</div>
      </>
    )
  }

  if (error) {
    return (
      <SuccessPage>
        <SuccessContainer>
          <SuccessTitle>Payment Error</SuccessTitle>
          <SuccessMessage>{error}</SuccessMessage>
          <ActionButtons>
            <ActionBtn to="/">Return to Shop</ActionBtn>
            <ActionBtn to="/contact">Contact Support</ActionBtn>
          </ActionButtons>
        </SuccessContainer>
      </SuccessPage>
    )
  }

  return (
    <SuccessPage>
      <SuccessContainer>
        <SuccessIcon>✓</SuccessIcon>
        <SuccessTitle>Payment Successful!</SuccessTitle>
        <SuccessMessage>
          Thank you for your order! Your payment has been processed successfully. 
          You will receive a confirmation email shortly.
        </SuccessMessage>
        
        {order && (
          <>
            <OrderDetails>
              <OrderDetail>
                <DetailLabel>Order ID:</DetailLabel>
                <DetailValue>{order.id}</DetailValue>
              </OrderDetail>
              <OrderDetail>
                <DetailLabel>Total Amount:</DetailLabel>
                <DetailValue>R{order.total.toFixed(2)}</DetailValue>
              </OrderDetail>
              <OrderDetail>
                <DetailLabel>Status:</DetailLabel>
                <DetailValue>{order.status}</DetailValue>
              </OrderDetail>
              <OrderDetail>
                <DetailLabel>Date:</DetailLabel>
                <DetailValue>
                  {new Date(order.createdAt).toLocaleDateString()}
                </DetailValue>
              </OrderDetail>
            </OrderDetails>
            
            {order.customerInfo && (
              <DeliverySection>
                <DeliveryTitle>Delivery Information</DeliveryTitle>
                <DeliveryInfo>
                  <DeliveryLine>
                    <strong>{order.customerInfo.firstName} {order.customerInfo.lastName}</strong>
                  </DeliveryLine>
                  <DeliveryLine>{order.customerInfo.address}</DeliveryLine>
                  <DeliveryLine>
                    {order.customerInfo.city}, {order.customerInfo.province} {order.customerInfo.postalCode}
                  </DeliveryLine>
                  <DeliveryLine>Phone: {order.customerInfo.phone}</DeliveryLine>
                  <DeliveryLine>Email: {order.customerInfo.email}</DeliveryLine>
                </DeliveryInfo>
              </DeliverySection>
            )}
          </>
        )}
        
        <ActionButtons>
          <ActionBtn to="/">Continue Shopping</ActionBtn>
          <ActionBtn to="/contact">Contact Support</ActionBtn>
        </ActionButtons>
      </SuccessContainer>
    </SuccessPage>
  )
}

export default PaymentSuccess 