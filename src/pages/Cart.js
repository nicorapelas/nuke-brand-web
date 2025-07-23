import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CartPage = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-image: url('/images/g5.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
`;

const BackLink = styled(Link)`
  color: #fecb00;
  text-decoration: none;
  margin-bottom: 20px;
  display: block;
  background: rgba(0, 0, 0, 0.9);
  padding: 10px 15px;
  border-radius: 5px;
  backdrop-filter: blur(10px);
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 15px;
  border-bottom: 2px solid rgba(254, 203, 0, 0.3);
  color: #fecb00;
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ecf0f1;
`;

const ProductCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityBtn = styled.button`
  background: #3498db;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background: #2980b9;
  }
`;

const QuantityText = styled.span`
  font-weight: bold;
  min-width: 30px;
  text-align: center;
`;

const CheckoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding: 20px;
  background: rgba(254, 203, 0, 0.1);
  border: 2px solid #fecb00;
  border-radius: 10px;
`;

const CartTotal = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #fecb00;
  margin: 0;
`;

const CheckoutBtn = styled.button`
  background: #fecb00;
  color: #000;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background: #e6b800;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #fecb00;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  margin: 20px 0;
`;

const CartContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  color: #fecb00;
`;

const Cart = () => {
  const { items, updateCartItem, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartItem(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <CartPage>
        <BackLink to="/">← Back to Shop</BackLink>
        <EmptyCart>
          <h1>Your Cart</h1>
          <p>Your cart is empty.</p>
        </EmptyCart>
      </CartPage>
    );
  }

  return (
    <CartPage>
      <BackLink to="/">← Back to Shop</BackLink>
      <CartContainer>
      <h1>Your Cart</h1>
      
      <CartTable>
        <thead>
          <tr>
            <TableHeader>Product</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Total</TableHeader>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <ProductCell>
                <ProductImage src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </ProductCell>
              <TableCell>R{item.price}</TableCell>
              <TableCell>
                <QuantityControls>
                  <QuantityBtn onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                    -
                  </QuantityBtn>
                  <QuantityText>{item.quantity}</QuantityText>
                  <QuantityBtn onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    +
                  </QuantityBtn>
                </QuantityControls>
              </TableCell>
              <TableCell>R{(item.price * item.quantity).toFixed(2)}</TableCell>
            </tr>
          ))}
        </tbody>
      </CartTable>
      
      <CheckoutContainer>
        <CartTotal>Total: R{getCartTotal().toFixed(2)}</CartTotal>
        <CheckoutBtn onClick={handleCheckout}>Checkout</CheckoutBtn>
      </CheckoutContainer>
      </CartContainer>
    </CartPage>
  );
};

export default Cart; 