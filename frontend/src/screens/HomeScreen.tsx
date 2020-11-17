import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Carousel from 'react-bootstrap/Carousel'
import Product from '../components/Product/Product'
import Loader from '../components/Loader/Loader'
import Message from '../components/Message/Message'
import Paginate from '../components/Paginate'
import { getConfig } from '../utils/utils'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './css/HomeScreen.css'
import { Spring } from 'react-spring/renderprops'
import { useSelector } from 'react-redux'

const Home = ({ match }) => {
  // STATES
  const { appConfig } = useSelector((state) => state.appConfig)

  const [loading, setLoading] = useState(true)
  const [error] = useState(null)
  const [products, setProducts] = useState([])

  const keyword = match.params.keyword || ''
  const [pageSize] = useState(8)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)

  const getProducts = (options) => {
    setLoading(true)
    Axios.post(`/api/products?keyword=${keyword}`, options, getConfig())
      .then((res) => {
        setProducts(res.data.products)
        setTotalPages(res.data.totalPages)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }

  // USE EFFECT
  useEffect(() => {
    getProducts({ pageSize, page })
    /* eslint-disable */
  }, [keyword, page, pageSize])

  // HANDLERS
  const handleSetPage = (page) => {
    setPage(page)
    const options = {
      pageSize,
      page
    }
    getProducts(options)
  }

  // CHECKER

  if (loading) return <Loader />
  if (error)
    return (
      <Message
        variant="secondary"
        children={<h5>`Error Loading Product Data : ({error})` </h5>}
      />
    )

  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {(props) => (
        <div style={props}>
          <div className="homescreen">
            {/* <h2 className="text-center">Latest Products</h2> */}
            <Helmet>
              <title>{`${appConfig.appTitle}`} | Home</title>
              <meta
                name="description"
                content="We sell the best milk tea in town"
              />
            </Helmet>
            <Row>
              <Col sm={12} md={12} lg={12} xl={12} className="px-1">
                <Carousel pause="hover" className="home__banner">
                  <Carousel.Item>
                    <Link to="/">
                      <img
                        className="d-block w-100"
                        src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_Tallhero_Dash_en_US_1x._CB418727898_.jpg"
                        //src="https://lh3.googleusercontent.com/pw/ACtC-3coPYV08T_wZxuflE6VSZw8mZMDaz7TLQF4An4yh_I1fQHjqU6ZxSbACo4RPSKoVFigTUh-bvVfCJnSQ2Z1ET1UROyobgSC85W8B442GTTNWVJOjPjkDP4diuQatnQ4aOvsMZH2m3xwNq0yGqBGEsgA=w1528-h860-no?authuser=0"
                        alt="First slide"
                      />
                    </Link>
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Link to="/">
                      <img
                        className="d-block w-100"
                        src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Sports_en_US_1x._CB431860448_.jpg"
                        //src="https://lh3.googleusercontent.com/pw/ACtC-3fOB90se8nZBWikrIooT9tptk8gXsVn4v2cDdGR4hH-psA_n_ETvfk_MtyIL5kAsmL1ZquD-QoOu4x6bGvfrAibA71ksLiVPjXfaFRNroJ5i3H9wcy52qlcnijpWmjMOsgBmqwc8B8QVelffeaXdP1B=w1568-h882-no?authuser=0"
                        alt="Third slide"
                      />
                      <Carousel.Caption></Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Link to="/">
                      <img
                        className="d-block w-100"
                        src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/PrimeDay/Fuji_TallHero_NonPrime_v2_en_US_1x._CB403670067_.jpg"
                        //src="https://lh3.googleusercontent.com/pw/ACtC-3fy7OvnbVdnHK2jhOXk8lTCf_r05VG3i-15YoqG2gcsdU7HI0e3M9rkp7GekD1cgAAa-WsEJXLFHqdmE6w_5Ckz60hzz90vgTtfDuRPR71tH-7nsOgG63u79yuDfwG2ANZ_bAw0m0bxrJHY25oqrJeY=w1507-h848-no?authuser=0"
                        alt="Third slide"
                      />
                      <Carousel.Caption></Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>

            {/* <Image
				src=""
				alt="banner"
				className="home__banner"
			/> */}

            <Row>
              {products.map((product, i) => (
                <Col
                  key={i}
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  className="px-1"
                >
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              setPage={handleSetPage}
              totalPages={totalPages}
              page={page}
            />
          </div>
        </div>
      )}
    </Spring>
  )
}

export default Home
