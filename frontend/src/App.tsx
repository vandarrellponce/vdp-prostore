import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route } from 'react-router-dom'
import './app.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import CartScreen from './screens/CartScreen'
import Home from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProductDetail from './screens/ProductDetailScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import { useDispatch } from 'react-redux'
import { authUser } from './actions/users/loginUser'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import { Col, Row } from 'react-bootstrap'
import Toolbar from './components/Header2/Toolbar/Toolbar'
import Sidebar from './components/Header2/Sidebar/Sidebar'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Toolbar />

      <main className="py-0">
        <Row style={{ width: '100%' }}>
          <Col xs={12} md={2} className="px-3"></Col>
          <Col xs={12} md={8} className="ml-3">
            {/* <Container> */}
            <Route path="/orders/:orderId/pay" component={OrderScreen} />
            <Route path="/admin/users/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/products/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/cart" component={CartScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/search/:keyword" component={Home} exact />
            <Route path="/" exact component={Home} />
            {/* </Container> */}
          </Col>
          <Col xs={12} md={2} className="pr-0 mr-0 pl-0 ml-0"></Col>
        </Row>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
