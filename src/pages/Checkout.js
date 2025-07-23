import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useCart } from '../context/CartContext'
import api from '../utils/api'
import LoadingModal from '../components/LoadingModal'

const CheckoutPage = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-image: url('/images/g5.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
`

const CheckoutContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  color: #fecb00;
`

const CheckoutTitle = styled.h1`
  color: #fecb00;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
`

const CheckoutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const CustomerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Label = styled.label`
  font-weight: bold;
  color: #fecb00;
`

const Input = styled.input`
  padding: 12px;
  border: 1px solid rgba(254, 203, 0, 0.3);
  border-radius: 5px;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.3);
  color: #fecb00;
  
  &:focus {
    outline: none;
    border-color: #fecb00;
    box-shadow: 0 0 5px rgba(254, 203, 0, 0.3);
  }
  
  &::placeholder {
    color: rgba(254, 203, 0, 0.6);
  }
`

const OrderSummary = styled.div`
  background: rgba(254, 203, 0, 0.1);
  border: 2px solid #fecb00;
  border-radius: 10px;
  padding: 20px;
`

const OrderTitle = styled.h3`
  color: #fecb00;
  margin-bottom: 15px;
  font-size: 1.3rem;
`

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(254, 203, 0, 0.2);
  
  &:last-child {
    border-bottom: none;
  }
`

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const ItemImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 5px;
`

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const ItemTitle = styled.span`
  font-weight: bold;
  color: #fecb00;
`

const ItemPrice = styled.span`
  color: rgba(254, 203, 0, 0.8);
  font-size: 0.9rem;
`

const ItemQuantity = styled.span`
  color: rgba(254, 203, 0, 0.6);
  font-size: 0.8rem;
`

const TotalSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(254, 203, 0, 0.3);
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fecb00;
`

const PayFastBtn = styled.button`
  background: #fecb00;
  color: #000;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e6b800;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(254, 203, 0, 0.4);
  }
  
  &:disabled {
    background: rgba(254, 203, 0, 0.5);
    cursor: not-allowed;
    transform: none;
  }
`

const ErrorMessage = styled.div`
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #f44336;
`

const Checkout = () => {
  const navigate = useNavigate()
  const { items, getCartTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  })

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const requestData = {
        customerInfo,
        items,
        total: getCartTotal()
      }

      // Enhanced debug logging
      console.log('=== ENHANCED FRONTEND DEBUG ===')
      console.log('Request Data:', JSON.stringify(requestData, null, 2))
      console.log('Items:', JSON.stringify(items, null, 2))
      console.log('Customer Info:', JSON.stringify(customerInfo, null, 2))
      console.log('Total:', getCartTotal())
      console.log('================================')

      const response = await api.post('/payments/initiate', requestData)

      if (response.data.success) {
        // Enhanced debug logging
        console.log('=== ENHANCED PAYFAST RESPONSE ===')
        console.log('Response:', JSON.stringify(response.data, null, 2))
        console.log('Payment Data:', JSON.stringify(response.data.paymentData, null, 2))
        console.log('Redirect URL:', response.data.redirectUrl)
        console.log('All payment data keys:', Object.keys(response.data.paymentData))
        console.log('==================================')

        // Create a form to submit to PayFast
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = response.data.redirectUrl

        // Add all payment data as hidden fields (only required PayFast fields)
        const requiredKeys = [
          'merchant_id', 'merchant_key', 'return_url', 'cancel_url', 'notify_url',
          'm_payment_id', 'amount', 'item_name', 'name_first', 'name_last', 'email_address', 'signature'
        ];
        Object.keys(response.data.paymentData).forEach(key => {
          if (requiredKeys.includes(key)) {
            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = key
            input.value = response.data.paymentData[key]
            form.appendChild(input)
          }
        })

        // Enhanced form debugging
        console.log('=== ENHANCED FORM DEBUG ===')
        console.log('Form action:', form.action)
        console.log('Form method:', form.method)
        console.log('Form fields:', Array.from(form.elements).map(el => ({ 
          name: el.name, 
          value: el.value,
          type: el.type 
        })))
        console.log('Form HTML:', form.outerHTML)
        console.log('==========================')

        // Submit the form to redirect to PayFast
        document.body.appendChild(form)
        form.submit()
      } else {
        setError('Failed to initiate payment. Please try again.')
      }
    } catch (error) {
      console.error('=== CHECKOUT ERROR ===')
      console.error('Error object:', error)
      console.error('Error response:', error.response)
      console.error('Error message:', error.message)
      console.error('Error status:', error.response?.status)
      console.error('Error data:', error.response?.data)
      console.error('=====================')
      setError(error.response?.data?.error || 'Failed to initiate payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <>
      <LoadingModal isVisible={loading} message="Processing payment..." />
      <CheckoutPage>
        <CheckoutContainer>
          <CheckoutTitle>Checkout</CheckoutTitle>
          
          <CheckoutContent>
            <CustomerForm onSubmit={handleSubmit}>
              {error && <ErrorMessage>{error}</ErrorMessage>}              
              <FormGroup>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={customerInfo.firstName}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={customerInfo.lastName}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="address">Delivery Address *</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  placeholder="Street address, suburb, etc."
                  required
                  disabled={loading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="city">City *</Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="province">Province *</Label>
                <Input
                  type="text"
                  id="province"
                  name="province"
                  value={customerInfo.province}
                  onChange={handleInputChange}
                  placeholder="Gauteng, Western Cape, etc."
                  required
                  disabled={loading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={customerInfo.postalCode}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </FormGroup>
              
              <PayFastBtn type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Pay with PayFast'}
              </PayFastBtn>
            </CustomerForm>
            
            <OrderSummary>
              <OrderTitle>Order Summary</OrderTitle>
              
              {items.map((item) => (
                <OrderItem key={item.id}>
                  <ItemInfo>
                    <ItemImage src={item.image} alt={item.title} />
                    <ItemDetails>
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemPrice>R{item.price}</ItemPrice>
                      <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                    </ItemDetails>
                  </ItemInfo>
                  <span>R{(item.price * item.quantity).toFixed(2)}</span>
                </OrderItem>
              ))}
              
              <TotalSection>
                <TotalRow>
                  <span>Total:</span>
                  <span>R{getCartTotal().toFixed(2)}</span>
                </TotalRow>
              </TotalSection>
            </OrderSummary>
          </CheckoutContent>
        </CheckoutContainer>
      </CheckoutPage>
    </>
  )
}

export default Checkout 