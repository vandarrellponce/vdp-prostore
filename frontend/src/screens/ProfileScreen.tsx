import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import { updateUser } from '../actions/users/updateUser'
import { Helmet } from 'react-helmet'
import Paginate from '../components/Paginate'
import Axios from 'axios'

const ProfileScreen = (props) => {
  const [name, setName] = useState('')
  /* const [email, setEmail] = useState('') */
  const [isChangePassword] = useState(true)
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [formError, setFormError] = useState(null)
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.user)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])

  const [pageSize] = useState(8)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)

  const getOrders = (options) => {
    setLoading(true)
    Axios.post('/api/orders/myorders', options)
      .then((res) => {
        setOrders(res.data.orders)
        setTotalPages(res.data.totalPages)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setError(
          error.response?.data?.message
            ? error.response.data.message
            : error.message
        )
      })
  }

  // USE EFFECT
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
    }
    getOrders({ pageSize, page })
  }, [userInfo, dispatch, pageSize, page])

  // HANDLERS
  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== rePassword) return setFormError('Password does not match')
    dispatch(
      updateUser({
        name,
        password
      })
    )

    setFormError(null)
  }
  const handleSetPage = (page) => {
    setPage(page)
    const options = {
      pageSize,
      page
    }
    getOrders(options)
  }

  if (!userInfo) return <Loader />
  if (loading) return <Loader />
  return (
    <Row className="py-3">
      <Helmet>
        <title>Kumbatea! | Profile</title>
        <meta name="description" content="We sell the best milk tea in town" />
      </Helmet>
      <Col md={3}>
        {/* 	{success && (
					<Message
						children={
							'User profile updated, click here to refresh the page'
						}
						variant="success"
					/>
				)} */}

        {error && <Message children={error} variant="info" />}
        {formError && <Message children={formError} variant="danger" />}
        {loading && <Loader />}

        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label id="name">Name</Form.Label>

            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="email">
						<Form.Label id="email">Email Address</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group> */}

          <Form.Group controlId="password">
            <Form.Label id="password">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isChangePassword}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label id="rePassword">Re-type Password</Form.Label>
            <Form.Control
              type="password"
              value={rePassword}
              placeholder="Re-enter new password"
              onChange={(e) => setRePassword(e.target.value)}
              disabled={!isChangePassword}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="secondary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <h2>My Orders</h2>
            {loading ? (
              <Loader />
            ) : (
              <div>
                <Table hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th>DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>{order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{
                                  color: 'red'
                                }}
                              ></i>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              order.deliveredAt.substring(0, 10)
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{
                                  color: 'red'
                                }}
                              ></i>
                            )}
                          </td>
                          <td>
                            <div>
                              <LinkContainer to={`/orders/${order._id}/pay`}>
                                <Button variant="secondary" className="btn-sm">
                                  Details
                                </Button>
                              </LinkContainer>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <Paginate
                  page={page}
                  totalPages={totalPages}
                  setPage={handleSetPage}
                />
              </div>
            )}
          </div>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
