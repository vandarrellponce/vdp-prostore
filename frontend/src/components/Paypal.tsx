import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'

const Paypal = (props) => {
	const [clientId, setClientId] = useState('')

	useEffect(() => {
		const fetchPaypalClientId = async () => {
			const clientId = await (
				await Axios.get('http://localhost:5000/api/config/paypal')
			).data
			setClientId(clientId)
		}

		fetchPaypalClientId()
	}, [])

	const onSuccess = (payment) => {
		// Congratulation, it came here means everything's fine!
		props.paymentSuccess(payment)
		console.log(payment)
	}

	const onCancel = (data) => {
		// User pressed "cancel" or close Paypal's popup!
		console.log('The payment was cancelled!', data)
		props.paymentCancelled(data)
	}

	const onError = (err) => {
		// The main Paypal's script cannot be loaded or somethings block the loading of that script!
		console.log('Error!', err)
		props.paymentError(err)
	}

	let env = 'sandbox' // you can set here to 'production' for production
	let currency = 'PHP' // or you can set this value from your props or state
	let total = props.total

	const client = {
		sandbox: clientId,
		production: 'YOUR-PRODUCTION-APP-ID',
	}
	return (
		<PaypalExpressBtn
			env={env}
			client={client}
			currency={currency}
			total={total}
			onError={onError}
			onSuccess={onSuccess}
			onCancel={onCancel}
			style={{
				size: 'large',
				color: 'blue',
				shape: 'rect',
				label: 'checkout',
			}}
		/>
	)
}

export default Paypal
