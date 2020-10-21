import Axios from 'axios'
import React from 'react'
import { Button, Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_SUCCESS,
} from '../constants/productConst'
import { getConfig } from '../utils/utils'
import { useDispatch } from 'react-redux'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
	const dispatch = useDispatch()
	/* 	const handleClick = (e) => {
		e.preventDefault()
		Axios.post(
			'/api/products/',
			{
				pageSize,
				keyword,
				page: e.target.value,
			},
			getConfig()
		)
			.then((res) => {
				dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data.products })
			})
			.catch((error) => {
				dispatch({
					type: PRODUCT_LIST_FAIL,
					payload: error.response?.data?.message
						? error.response.data.message
						: error.message,
				})
			})
	} */
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages)].map((item, i) => (
					<LinkContainer
						key={i + 1}
						to={
							!isAdmin
								? keyword
									? `/search/${keyword}/page/${i + 1}`
									: `/page/${i + 1}`
								: `/admin/productlist/${i + 1}`
						}
					>
						<Pagination.Item active={i + 1 === page}>{i + 1}</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	)
	/* return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages)].map((item, i) => (
					
						<Pagination.Item value={i + 1} active={i + 1 === page} onClick={}>
							{i + 1}
						</Pagination.Item>
					
				))}
			</Pagination>
		)
	) */
}

export default Paginate
