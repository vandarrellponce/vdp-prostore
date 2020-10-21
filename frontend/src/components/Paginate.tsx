import React from 'react'
import { Pagination } from 'react-bootstrap'

const Paginate = ({ totalPages, setPage, page }) => {
	return (
		totalPages > 1 && (
			<Pagination>
				{[...Array(totalPages)].map((item, i) => (
					<Pagination.Item
						key={i}
						value={i + 1}
						active={i + 1 === page}
						onClick={() => setPage(i + 1)}
					>
						{i + 1}
					</Pagination.Item>
				))}
			</Pagination>
		)
	)
}

export default Paginate
