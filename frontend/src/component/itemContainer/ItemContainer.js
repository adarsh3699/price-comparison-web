import React, { useCallback } from 'react';

import noImage from '../../assets/noImage.png';

import './itemContainer.css';

const ItemContainer = ({ item, apiBaseUrl, handleMsgShown, setProductIsLoading }) => {
	const handleProductClick = useCallback(
		async (id) => {
			if (!id) return handleMsgShown('Missing Product ID');
			try {
				setProductIsLoading(true);
				const response = await fetch(apiBaseUrl + 'product/' + id);
				const data = await response.json();
				if (response.status === 200) {
					setProductIsLoading(false);
					window.open(data.productUrl, '_blank').focus();
				} else {
					handleMsgShown(data?.message);
				}
			} catch (e) {
				console.log(e);
				handleMsgShown('Please allow popup to opening');
			}
		},
		[apiBaseUrl, handleMsgShown, setProductIsLoading]
	);

	return (
		<div className="itemContainer">
			<img
				src={item?.image || noImage}
				className="productImg"
				alt={item?.name || 'Product Image'}
				loading="lazy"
				onClick={() => handleProductClick(item.id)}
				onError={(e) => {
					e.target.src = noImage; // Replace with noImage logo on error
				}}
			/>
			<div>
				<div className="productName" onClick={() => handleProductClick(item.id)}>
					{item?.title}
				</div>
				<div className="productPriceBox" onClick={() => handleProductClick(item.id)}>
					<div className="productPrice">₹{item?.source_price}</div>
					<div className="productMRP">₹{item?.source_mrp}</div>
					<div className="product_discount">{item?.discount}% OFF</div>
				</div>
				{item?.offers[0] && (
					<details>
						<summary>
							<b>Offers:</b>
						</summary>
						<ul>
							{item?.offers?.map((item, index) => {
								return <li key={index}>{item}</li>;
							})}
						</ul>
					</details>
				)}
				<img src={item?.source_icon} className="product_source_icon" alt={item.source_name} />
			</div>
		</div>
	);
};

export default ItemContainer;
