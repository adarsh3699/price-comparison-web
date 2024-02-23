import React from 'react';

import search_Icon from './search_Icon.svg';

import './navbar.css';

const Navbar = ({ handleSearch, resetToHomePage, searchText, setSearchText }) => {
	return (
		<div className="navbar">
			<div className="navbar__logo" onClick={resetToHomePage}>
				Compare<span>Now</span>
			</div>
			<form className="navbar__search" onSubmit={handleSearch}>
				<input
					type="text"
					className="navbar__search_input"
					name="searchBox"
					autoComplete="off"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					placeholder="Search"
				/>
				<button className="navbar__search_button">
					<img src={search_Icon} alt="search" />
				</button>
			</form>
		</div>
	);
};

export default Navbar;
