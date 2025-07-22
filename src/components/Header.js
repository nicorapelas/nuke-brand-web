import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useCart } from '../context/CartContext';

const HeaderContainer = styled.header`
  background: #000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const ShippingBanner = styled.div`
  background: #fecb00;
  color: #000;
  text-align: center;
  padding: 8px;
  font-size: 14px;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoImg = styled.img`
  height: 40px;
  width: auto;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Since = styled.span`
  font-size: 12px;
  color: #fecb00;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fecb00;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #fff;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const BulkSign = styled.button`
  background: #fecb00;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  animation: ${pulse} 2s infinite;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(254, 203, 0, 0.6), 0 0 20px rgba(254, 203, 0, 0.4), 0 0 30px rgba(254, 203, 0, 0.2);
  
  &:hover {
    background: #e6b800;
    transform: scale(1.1);
    animation: none;
    box-shadow: 0 0 15px rgba(254, 203, 0, 0.8), 0 0 30px rgba(254, 203, 0, 0.6), 0 0 45px rgba(254, 203, 0, 0.4);
  }
`;

const CartLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: #fecb00;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CartIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #fecb00;
  color: #000;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
`;

const Header = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const navigate = useNavigate();
  const location = useLocation();

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const handleBulkSpecialsClick = () => {
    navigate('/contact');
  };

  const isHomePage = location.pathname === '/';

  return (
    <HeaderContainer>
      <ShippingBanner>
        Free shipping for the month of {currentMonth}
      </ShippingBanner>
      <HeaderContent>
        <Logo to="/">
          <LogoImg src="/images/g4.png" alt="Nuke Watches" />
          <LogoText>
            <Since>Since 2003</Since>
          </LogoText>
        </Logo>
        
        <Nav>
          <NavGroup>
            <BulkSign onClick={handleBulkSpecialsClick}>
              Bulk Specials Available
            </BulkSign>
            {!isHomePage && <NavLink to="/">Shop Now</NavLink>}
          </NavGroup>
          
          <NavGroup>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <CartLink to="/cart">
              <CartIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true">
                <path d="m2.007 10.156.387-4.983a1 1 0 0 1 .997-.923h7.218a1 1 0 0 1 .997.923l.387 4.983c.11 1.403-1.16 2.594-2.764 2.594H4.771c-1.605 0-2.873-1.19-2.764-2.594" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path d="M5 3.5c0-1.243.895-2.25 2-2.25S9 2.257 9 3.5V5c0 1.243-.895 2.25-2 2.25S5 6.243 5 5z" fill="none" stroke="currentColor" strokeWidth="1"/>
              </CartIcon>
              {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
            </CartLink>
          </NavGroup>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;