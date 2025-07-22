import React from 'react';
import styled from 'styled-components';

const AboutPage = styled.div`
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

const AboutTitle = styled.h1`
  color: #fecb00;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
`;

const AboutContent = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  line-height: 1.6;
  color: #fecb00;
`;

const AboutSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: #fecb00;
  margin-bottom: 15px;
  font-size: 1.5rem;
  border-bottom: 2px solid rgba(254, 203, 0, 0.3);
  padding-bottom: 10px;
`;

const StoreImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  margin: 20px auto;
  display: block;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
`;

const Tagline = styled.h3`
  color: #fecb00;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 20px;
  font-style: italic;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const BulletItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid rgba(254, 203, 0, 0.2);
  color: #fecb00;
  
  &:before {
    content: "• ";
    color: #fecb00;
    font-weight: bold;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const HighlightText = styled.span`
  font-weight: bold;
  color: #fecb00;
`;

const About = () => {
  return (
    <AboutPage>
      <AboutContent>
        <AboutTitle>About Us</AboutTitle>
        
        <Tagline>
          <HighlightText>Built to Last. Priced to Move. Trusted by Thousands.</HighlightText>
        </Tagline>
        
        <AboutSection>
          <p>
            Welcome to <HighlightText>Nuke</HighlightText>, the proudly South African watch brand trusted by companies and workers across the country. Whether you&apos;re on-site, on the road, or off the grid, Nuke watches are designed to take a beating—without beating your wallet.
          </p>
        </AboutSection>
        
        <AboutSection>
          <p>
            Born from the needs of real working people, Nuke was launched under <HighlightText>Jacobs Cycles & Hardware</HighlightText>, a family-owned business based in <HighlightText>Carletonville, Gauteng</HighlightText>. With deep roots in the heart of South Africa&apos;s mining belt, we&apos;ve made it our mission to provide <HighlightText>durable, reliable, and affordable timepieces</HighlightText> to those who need them most.
          </p>
        </AboutSection>
        
        <AboutSection>
          <p>
            Our watches are used and loved by <HighlightText>contracted workers, miners, security personnel</HighlightText>, and tradespeople across South Africa—people who don&apos;t have time for breakdowns or break-the-bank prices.
          </p>
        </AboutSection>
        
        <AboutSection>
          <SectionTitle>Our Store in Carletonville</SectionTitle>
          <StoreImage src="/images/storeFront-W1200.jpg" alt="Nuke Brand Store in Carletonville" />
        </AboutSection>
        
        <AboutSection>
          <SectionTitle>Why Nuke?</SectionTitle>
          <BulletList>
            <BulletItem><HighlightText>Affordability</HighlightText> without sacrificing quality</BulletItem>
            <BulletItem><HighlightText>Rugged durability</HighlightText> for tough environments</BulletItem>
            <BulletItem><HighlightText>Locally backed</HighlightText> with fast support and bulk pricing</BulletItem>
            <BulletItem><HighlightText>Trademark registered in 2003</HighlightText>, giving you peace of mind with a brand that&apos;s stood the test of time</BulletItem>
          </BulletList>
        </AboutSection>
        
        <AboutSection>
          <p>
            At Nuke, we believe that <HighlightText>everyone deserves a watch they can depend on</HighlightText>, no matter where they work or what they earn.
          </p>
        </AboutSection>
        
        <AboutSection>
          <p>
            Thank you for supporting a local brand that puts strength, simplicity, and service first.
          </p>
        </AboutSection>
        
        <AboutSection>
          <Tagline>
            <HighlightText>Nuke™ – Time That Works.</HighlightText>
          </Tagline>
        </AboutSection>
      </AboutContent>
    </AboutPage>
  );
};

export default About; 