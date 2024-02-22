import React from 'react';

function PaginationBox() {
	return (
		<div>
			<div className="pagination">
				<a href="#">&laquo;</a>
				<a href="#">1</a>
				<a href="#" className="active">
					2
				</a>
				<a href="#">3</a>
				<a href="#">4</a>
				<a href="#">5</a>
				<a href="#">6</a>
				<a href="#">&raquo;</a>
			</div>
		</div>
	);
}

export default PaginationBox;
