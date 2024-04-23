import React from 'react';
import Loader from '../loader/Loader';

import './loadingDialog.css';

function LoadingDialog({ setProductIsLoading }) {
	return (
		<div className="modalBg">
			<div className="modal">
				<div className="modal-bar">
					<span className="modalTags">Opening Product</span>
					<span className="closeBtn" onClick={() => setProductIsLoading((prev) => !prev)}>
						&times;
					</span>
				</div>
				<div className="modal-content">
					<Loader isLoading={true} />
				</div>
			</div>
		</div>
	);
}

export default LoadingDialog;
