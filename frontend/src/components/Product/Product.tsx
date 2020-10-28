import React, { useEffect, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Rating from '../Rating/Rating'
import { Link } from 'react-router-dom'
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

	return (
		<div
			className="mycontainer"
			onTouchMove={(e) => {
				let xAxis = (window.innerWidth / 2 - e.touches[0].clientX) / 10
				let yAxis = (window.innerHeight / 2 - e.touches[0].clientY) / 10
				cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
			}}
			onTouchStart={(e) => {
				cardRef.current.style.transition = 'none'
			}}
			onTouchEnd={(e) => {
				cardRef.current.style.transition = 'all 0.5s ease'
				cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
			}}
			onMouseMove={(e) => {
				let xAxis = (window.innerWidth / 2 - e.pageX) / 15
				let yAxis = (window.innerHeight / 2 - e.pageY) / 15
				cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
			}}
			onMouseEnter={(e) => {
				cardRef.current.style.transition = 'none'
			}}
			onMouseLeave={(e) => {
				cardRef.current.style.transition = 'all 0.5s ease'
				cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
			}}
		>
			<Card className="my-1 p-1 rounded card product__card" ref={cardRef}>
				<Link to={`/products/${product._id}`}>
					<Card.Img src={product.image} variant="top" />
				</Link>

				<Card.Body className="product__card__body">
					<Link to={`/products/${product._id}`}>
						<Card.Title as="div" className="product__card__title">
							<strong>{product.name}</strong>
						</Card.Title>
					</Link>

					<Card.Text as="div">
						<Rating
							value={product.rating}
							text={` ${product.numReviews} reviews`}
							color="orange"
						/>
					</Card.Text>

					<Card.Text as="h6"> &#8369;{product.price}</Card.Text>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Product
