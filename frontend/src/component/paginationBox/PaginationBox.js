import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import arrow from './arrow.svg';
import './paginationBox.css';

function PaginationBox({ page, setPage, handleSearch, handleMsgShown }) {
	const navigate = useNavigate();

	const handlePageChange = useCallback(
		(page) => {
			if (page < 1) return handleMsgShown('You are already on first page');

			setPage(page);
			const search = new URLSearchParams(window.location.search).get('search');
			navigate('/?search=' + search + '&page=' + page);
			window.scrollTo(0, 0);
			handleSearch({ target: { searchBox: { value: search } } }, true, page);
		},
		[handleMsgShown, setPage, navigate, handleSearch]
	);
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
			<div onClick={() => handlePageChange(page + 10)}>+10</div>
		</div>
	);
}

export default PaginationBox;
