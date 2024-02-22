import React from 'react';
import './itemContainer.css';

const ItemContainer = ({ item }) => {
	return (
		<div className="itemContainer">
			<img src={item?.image} className="productImg" alt={item?.name} />
			<div>
				<div className="productName">{item?.title}</div>
				<div className="productPriceBox">
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
