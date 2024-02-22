import React from 'react';

import arrow from './arrow.svg';
import './paginationBox.css';

function PaginationBox({ page, handlePageChange }) {
	return (
		<div className="pagination">
			<div onClick={() => handlePageChange(1)}>First</div>

			<div>
				<img
					src={arrow}
					alt="arrow"
					onClick={() => handlePageChange(page - 1)}
					className="paginationLeftArrow paginationArrow"
				/>
			</div>
			<div>{page}</div>
			<div onClick={() => handlePageChange(page + 1)}>{page + 1}</div>
			<div onClick={() => handlePageChange(page + 2)}>{page + 2}</div>
			<div onClick={() => handlePageChange(page + 3)}>{page + 3}</div>
			<div>
				<img
					src={arrow}
					alt="arrow"
					onClick={() => handlePageChange(page + 1)}
					className="paginationRightArrow paginationArrow"
				/>
			</div>
			<div onClick={() => handlePageChange(page + 100)}>+100</div>
		</div>
	);
}

export default PaginationBox;
