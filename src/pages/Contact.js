import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../utils/api';
import LoadingModal from '../components/LoadingModal';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

const ContactPage = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ContactTitle = styled.h1`
  color: #fecb00;
  text-align: center;
  margin-bottom: 30px;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ContactInfo = styled.div`
  line-height: 1.6;
  color: #fecb00;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #fecb00;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SubmitBtn = styled.button`
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

const BulkOrdersSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background: rgba(254, 203, 0, 0.1);
  border: 2px solid #fecb00;
  animation: ${pulse} 3s infinite;
  box-shadow: 0 0 15px rgba(254, 203, 0, 0.4), 0 0 30px rgba(254, 203, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    animation: none;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(254, 203, 0, 0.6), 0 0 40px rgba(254, 203, 0, 0.4);
  }
`;

const BulkOrdersTitle = styled.h3`
  color: #fecb00;
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const BulkOrdersText = styled.p`
  color: #fecb00;
  margin: 0;
  line-height: 1.6;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await api.post('/contact/submit', formData);
      
      if (response.data.success) {
        setSubmitStatus({ type: 'success', message: response.data.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: response.data.error });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Failed to send message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingModal isVisible={loading} message="Sending your message..." />
      <ContactPage>
        <ContactTitle>Contact Us</ContactTitle>
        
        <ContactContent>
          <ContactInfo>
            <h2>Get in Touch</h2>
            <p>
              Have questions about our products or need help with a bulk order? 
              We&apos;re here to help!
            </p>
            
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> hello@nukebrand.com</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Hours:</strong> Monday - Friday, 9AM - 5PM EST</p>
            
            <BulkOrdersSection>
              <BulkOrdersTitle>Bulk Orders</BulkOrdersTitle>
              <BulkOrdersText>
                For bulk orders and special pricing, please contact us directly. 
                We offer competitive rates for teams and organizations.
              </BulkOrdersText>
            </BulkOrdersSection>
          </ContactInfo>
          
          <ContactForm onSubmit={handleSubmit}>
            {submitStatus && (
              <div style={{ 
                padding: '10px', 
                borderRadius: '5px', 
                marginBottom: '15px',
                backgroundColor: submitStatus.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                color: submitStatus.type === 'success' ? '#4caf50' : '#f44336',
                border: `1px solid ${submitStatus.type === 'success' ? '#4caf50' : '#f44336'}`
              }}>
              {submitStatus.message}
            </div>
            )}
            
            <FormGroup>
              <Label htmlFor="name">Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </FormGroup>
            
            <SubmitBtn type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </SubmitBtn>
          </ContactForm>
        </ContactContent>
      </ContactPage>
    </>
  );
};

export default Contact; 