import React from 'react'

interface Props {
	value: number
	text?: string
	color?: string
}

const Rating: React.FC<Props> = ({ value, text, color }) => {
	return (
		<div>
			<div className="rating">
				<span>
					<i
						style={{ color }}
						className={
							value >= 1
								? 'fas fa-star'
								: value >= 0.5
								? 'fas fa-star-half'
								: 'far fa-star'
						}
					></i>
				</span>

				<span>
					<i
						style={{ color }}
						className={
							value >= 2
								? 'fas fa-star'
								: value >= 1.5
								? 'fas fa-star-half'
								: 'far fa-star'
						}
					></i>
				</span>

				<span>
					<i
						style={{ color }}
						className={
							value >= 3
								? 'fas fa-star'
								: value >= 2.5
								? 'fas fa-star-half'
								: 'far fa-star'
						}
					></i>
				</span>

				<span>
					<i
						style={{ color }}
						className={
							value >= 4
								? 'fas fa-star'
								: value >= 3.5
								? 'fas fa-star-half'
								: 'far fa-star'
						}
					></i>
				</span>

				<span>
					<i
						style={{ color }}
						className={
							value >= 5
								? 'fas fa-star'
								: value >= 4.5
								? 'fas fa-star-half'
								: 'far fa-star'
						}
					></i>
				</span>
				<span>{text && text}</span>
			</div>
		</div>
	)
}

Rating.defaultProps = {
	color: '#f8e825',
}

export default Rating
