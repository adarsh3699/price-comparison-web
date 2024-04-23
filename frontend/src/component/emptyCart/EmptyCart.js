import React from 'react';
import emptyCartImg from './empty_cart.png';

import './emptyCart.css';

function EmptyCart() {
	return (
		<div className="emptyCart">
			<img src={emptyCartImg} alt="emptyCartImg" />
			<div>Did not match any product.</div>
		</div>
	);
}

export default EmptyCart;
