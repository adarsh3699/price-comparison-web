import React from 'react';
import './searchBox.css';

const SearchBox = ({ handleSearch }) => {
	return (
		<div className="searchBoxContainer">
			<div className="searchBoxTitle">Search Any Product</div>
			<form onSubmit={handleSearch} className="searchBoxForm">
				<input type="text" className="searchBoxInput" name="searchBox" placeholder="Search..." />
				<button type="submit" className="searchBoxFormBtn">
					Search
				</button>
			</form>
			<p className="searchBoxPara">
				Search for any product and get the best deals from all over the Amazon, Flipkart, and Croma.
			</p>
		</div>
	);
};

export default SearchBox;
