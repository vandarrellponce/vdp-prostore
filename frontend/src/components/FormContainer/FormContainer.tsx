import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const FormContainer = ({ children }) => {
	return (
		<Container>
			<Row className=" justify-content-md-center">
				<Col
					xs={12}
					md={4}
					style={{
						padding: '20px',
						border: 'solid 4px rgb(48,48,48)',
						borderRadius: '10px',
					}}
				>
					{children}
				</Col>
			</Row>
		</Container>
	)
}

export default FormContainer
