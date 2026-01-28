import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../utils/api'
import LoadingModal from '../components/LoadingModal'

const HeroContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/images/g5.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 40px 20px;
`

const WatchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`

const WatchItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
`

const WatchPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fecb00;
  text-align: center;
  background: #000;
  padding: 8px 16px;
  border-radius: 5px;
`

const WatchImg = styled.img`
  max-width: 225px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const DetailsBtn = styled(Link)`
  background: #fecb00;
  color: #000;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: #e6b800;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(254, 203, 0, 0.4);
  }
`

const SloganItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const SloganImg = styled.img`
  max-width: 280px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products')
        setProducts(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        // Silently handle product fetch errors
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getProductByHandle = handle => {
    const arr = Array.isArray(products) ? products : []
    const found = arr.find(product => product.handle === handle)
    return found
  }

  const ng101Product = getProductByHandle('digital-watch')
  const cgsr001Product = getProductByHandle('nuke-cgsr001-digital-watch')

  if (loading) {
    return (
      <>
        <LoadingModal isVisible={true} message="Loading products..." />
        <div>Loading...</div>
      </>
    )
  }

  return (
    <>
      <LoadingModal isVisible={loading} message="Loading products..." />
      <HeroContainer>
        <WatchContainer>
          <WatchItem>
            {ng101Product && <WatchPrice>R{ng101Product.price}</WatchPrice>}
            <WatchImg src="/images/g7.png" alt="Nuke NG101 Digital Watch" />
            <DetailsBtn to="/products/digital-watch">Details</DetailsBtn>
          </WatchItem>

          <SloganItem>
            <SloganImg src="/images/g10.png" alt="Nuke Built for tough jobs" />
          </SloganItem>

          <WatchItem>
            {cgsr001Product && <WatchPrice>R{cgsr001Product.price}</WatchPrice>}
            <WatchImg src="/images/g6.png" alt="Nuke CGSR001 Digital Watch" />
            <DetailsBtn to="/products/nuke-cgsr001-digital-watch">
              Details
            </DetailsBtn>
          </WatchItem>
        </WatchContainer>
      </HeroContainer>
    </>
  )
}

export default Home
