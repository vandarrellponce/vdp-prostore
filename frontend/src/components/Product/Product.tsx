import React, { useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Rating from '../Rating/Rating'
import { Link } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import './Product.css'

interface Props {
  product: {
    _id: string
    name: string
    image: string
    description: string
    brand: string
    category: string
    price: number
    countInStock: number
    rating: number
    numReviews: number
  }
}

const Product: React.FC<Props> = (props) => {
  const { product } = props
  const cardRef = useRef(null)
  const cardName = useRef(null)
  const cardRating = useRef(null)
  const cardPrice = useRef(null)
  const cardImage = useRef(null)

  return (
    <Spring
      from={{ opacity: 0, marginTop: 500 }}
      to={{ opacity: 1, marginTop: 0 }}
    >
      {(props) => (
        <div style={props}>
          <div
            className="mycontainer"
            /* onTouchMove={(e) => {
				let xAxis = (window.innerWidth / 2 - e.touches[0].clientX) / 15
				let yAxis = (window.innerHeight / 2 - e.touches[0].clientY) / 15
				cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
			}}
			onTouchStart={(e) => {
				cardRef.current.style.transition = 'none'
				cardImage.current.style.transform = 'translateZ(150px)'
				cardName.current.style.transform = 'translateZ(150px)'
				cardRating.current.style.transform = 'translateZ(150px)'
				cardPrice.current.style.transform = 'translateZ(150px)'
			}}
			onTouchEnd={(e) => {
				cardImage.current.style.transform = 'translateZ(0px)'
				cardName.current.style.transform = 'translateZ(0px)'
				cardRating.current.style.transform = 'translateZ(0px)'
				cardPrice.current.style.transform = 'translateZ(0px)'

				cardRef.current.style.transition = 'all 0.5s ease'
				cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
			}} */
            onMouseMove={(e) => {
              let xAxis = (window.innerWidth / 2 - e.pageX) / 30
              let yAxis = (window.innerHeight / 2 - e.pageY) / 30
              cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
            }}
            onMouseEnter={(e) => {
              cardImage.current.style.transform = 'translateZ(200px)'
              cardName.current.style.transform = 'translateZ(150px)'
              cardRating.current.style.transform = 'translateZ(150px)'
              cardPrice.current.style.transform = 'translateZ(150px)'

              cardRef.current.style.transition = 'none'
            }}
            onMouseLeave={(e) => {
              cardImage.current.style.transform = 'translateZ(0px)'
              cardName.current.style.transform = 'translateZ(0px)'
              cardRating.current.style.transform = 'translateZ(0px)'
              cardPrice.current.style.transform = 'translateZ(0px)'

              cardRef.current.style.transition = 'all 1s ease'
              cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
            }}
          >
            <Card className="my-1 p-1 rounded card product__card" ref={cardRef}>
              <Link to={`/products/${product._id}`}>
                <Card ref={cardImage}>
                  <Card.Img src={product.image} variant="top" />
                </Card>
              </Link>

              <Card.Body className="product__card__body">
                <Link to={`/products/${product._id}`}>
                  <Card.Title
                    as="div"
                    className="product__card__title"
                    ref={cardName}
                  >
                    <strong>{product.name}</strong>{' '}
                  </Card.Title>
                </Link>

                <Card.Text as="div" ref={cardRating}>
                  <Rating
                    value={product.rating}
                    text={` ${product.numReviews} reviews`}
                    color="orange"
                  />
                </Card.Text>

                <Card.Text as="h6" ref={cardPrice}>
                  &#8369;{product.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </Spring>
  )
}

export default Product
