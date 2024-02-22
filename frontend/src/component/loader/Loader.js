import React from 'react';
import './loader.css';

function Loader({ isLoading }) {
	return (
		<>
			{isLoading ? (
				<div id="loadingIcon">
					<div className="lds-spinner">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			) : null}
		</>
	);
}

export default Loader;
