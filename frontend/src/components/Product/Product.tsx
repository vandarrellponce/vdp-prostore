import React from 'react'
import Card from 'react-bootstrap/Card'
import Rating from '../Rating/Rating'
import { Link } from 'react-router-dom'

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
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/products/${product._id}`}>
				<Card.Img src={product.image} variant="top" />
			</Link>

			<Card.Body>
				<Link to={`/products/${product._id}`}>
					<Card.Title as="div">
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

				<Card.Text as="h3"> &#8369;{product.price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
