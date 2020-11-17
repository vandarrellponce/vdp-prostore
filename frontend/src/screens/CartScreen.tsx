import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import addToCart from '../actions/cart/addToCart'
import removeFromCart from '../actions/cart/removeFromCart'
import { Helmet } from 'react-helmet'
import './css/CartScreen.css'

const CartScreen = ({ match, location, history }) => {
  // STATES
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  // HANDLERS
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    history.push('/cart')
  }

  const checkOutHandler = (e) => {
    history.push('/shipping')
  }

  return (
    <div className="py-3 cartscreen__main">
      <Helmet>
        <title>Gentle Home | My Cart</title>
        <meta name="description" content="We sell the best milk tea in town" />
      </Helmet>
      <Row>
        <Col xs={12} md={8} className="cartscreen__col1">
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty,
              <Link to="/"> Go back to products </Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.product}
                  className="cartscreen__col1__item"
                >
                  <Row>
                    <Col xs={2} md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col xs={3} md={3} className="cartscreen__col1__item__name">
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                      <p
                        style={{
                          fontSize: '12px',
                          padding: '1px',
                          margin: '1px'
                        }}
                      >
                        {item.size.name}
                      </p>
                      {item.addons.length > 0 && (
                        <div>
                          {item.addons.map((addon, i) => (
                            <p
                              key={i}
                              style={{
                                fontSize: '12px',
                                padding: '1px',
                                margin: '1px'
                              }}
                            >
                              {addon.name}
                            </p>
                          ))}
                        </div>
                      )}
                    </Col>
                    <Col
                      xs={2}
                      md={2}
                      className="cartscreen__col1__item__price"
                    >
                      ₱
                      {item.price +
                        item.size.price +
                        item.addons.reduce((acc, i) => acc + i.price, 0)}
                    </Col>

                    {/* CHANGE THE QUANTITY OF SELECTED PRODUCT */}
                    <Col
                      xs={3}
                      md={2}
                      className="cartscreen__col1__item__select"
                    >
                      <Form.Control
                        size="sm"
                        style={{ cursor: 'pointer' }}
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(
                              item.product,
                              Number(e.target.value),
                              item.size,
                              item.addons
                            )
                          )
                          history.push('/cart')
                        }}
                      >
                        {[...Array(item.countInStock)].map((x, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col
                      xs={2}
                      md={2}
                      className="cartscreen__col1__item__button"
                    >
                      <Button
                        type="button"
                        variant="dark"
                        onClick={(e) => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col xs={12} md={4}>
          <Card className="my-2">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h4>
                ₱
                {cartItems
                  .reduce(
                    (acc, item) =>
                      acc +
                      (item.price +
                        item.size.price +
                        item.addons.reduce((acc, i) => acc + i.price, 0)) *
                        item.qty,
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={!cartItems.length}
                  onClick={checkOutHandler}
                >
                  Check Out
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartScreen
