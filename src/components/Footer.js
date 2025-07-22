import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #fecb00;
  color: #000;
  padding: 1z0px 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;

const JacobsLogo = styled.img`
  height: 60px;
  width: auto;
`;

const PayFastLogo = styled.img`
  height: 40px;
  width: auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          © 2024 Nuke.
        </FooterText>
        <JacobsLogo src="/images/jacobs-logo.png" alt="Jacobs Cycles & Hardware" />
        <PayFastLogo src="/images/payfastLogo.png" alt="PayFast Secure Payment" />
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 