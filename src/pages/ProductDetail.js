import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../utils/api'
import { useCart } from '../context/CartContext'
import LoadingModal from '../components/LoadingModal'

const ProductPage = styled.div`
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

const BackLink = styled(Link)`
  color: #fecb00;
  text-decoration: none;
  margin-bottom: 20px;
  display: block;
  background: rgba(0, 0, 0, 0.9);
  padding: 10px 15px;
  border-radius: 5px;
  backdrop-filter: blur(10px);
`

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProductImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProductImg = styled.img`
  width: 50%;
  height: auto;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  color: #fecb00;
  margin: 0;
`

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fecb00;
  margin: 0;
`

const BuyNowBtn = styled.button`
  background: #fecb00;
  color: #000;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #e6b800;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(254, 203, 0, 0.4);
  }

  &:disabled {
    background: #555;
    color: #999;
    cursor: not-allowed;
  }
`

const SoldOutBadge = styled.span`
  display: inline-block;
  background: #c62828;
  color: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 8px;
`

const SpecsList = styled.ul`
  list-style: none;
  padding: 0;
`

const SpecItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid rgba(254, 203, 0, 0.3);
  color: #fecb00;
`

const SpecsTitle = styled.h2`
  color: #fecb00;
  margin-bottom: 15px;
`

const DescriptionTitle = styled.h2`
  color: #fecb00;
  margin-bottom: 15px;
`

const DescriptionText = styled.p`
  color: #fecb00;
  line-height: 1.6;
`

const ProductDetail = () => {
  const { handle } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${handle}`)
        setProduct(response.data)
      } catch (error) {
        // Silently handle product fetch errors
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [handle])

  const handleAddToCart = async e => {
    e.preventDefault()
    if (product.soldOut) return
    try {
      await addToCart(product.id, 1)
      alert('Item added to cart successfully!')
    } catch (error) {
      // Silently handle add to cart errors
    }
  }

  if (loading) {
    return (
      <>
        <LoadingModal isVisible={true} message="Loading product..." />
        <div>Loading...</div>
      </>
    )
  }

  if (!product) return <div>Product not found</div>

  const isSoldOut = product.soldOut === true || product.handle === 'nuke-cgsr001-digital-watch'

  return (
    <>
      <LoadingModal isVisible={loading} message="Loading product..." />
      <ProductPage>
        <BackLink to="/">← Back to Shop</BackLink>

        <ProductContent>
          <ProductImage>
            <ProductImg src={product.image} alt={product.title} />
          </ProductImage>

          <ProductDetails>
            <ProductTitle>{product.title}</ProductTitle>
            <Price>R{product.price}</Price>
            {isSoldOut && <SoldOutBadge>Sold out</SoldOutBadge>}

            <form onSubmit={handleAddToCart}>
              <BuyNowBtn type="submit" disabled={isSoldOut}>
                {isSoldOut ? 'Sold out' : 'Add to Cart'}
              </BuyNowBtn>
            </form>

            <div>
              <SpecsTitle>Specs</SpecsTitle>
              <SpecsList>
                <SpecItem>
                  Water Resistance: {product.specs.waterResistance}
                </SpecItem>
                <SpecItem>Material: {product.specs.material}</SpecItem>
                <SpecItem>Weight: {product.specs.weight}</SpecItem>
              </SpecsList>
            </div>

            <div>
              <DescriptionTitle>Description</DescriptionTitle>
              <DescriptionText>{product.description}</DescriptionText>
            </div>
          </ProductDetails>
        </ProductContent>
      </ProductPage>
    </>
  )
}

export default ProductDetail
