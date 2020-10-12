import React from 'react'
import Alert from 'react-bootstrap/Alert'

// variants = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'

interface Props {
	variant?: string
	children: any
}

const Message: React.FC<Props> = ({ variant, children }) => {
	return (
		<div
			onClick={() => window.location.reload()}
			style={{ cursor: 'pointer' }}
		>
			<Alert variant={variant}>{children}</Alert>
		</div>
	)
}

Message.defaultProps = {
	variant: 'info',
}

export default Message
