import React, { useState } from 'react';
import search_Icon from './search_Icon.svg';

import './navbar.css';

const Navbar = ({ handleSearch }) => {
	const [searchText, setSearchText] = useState(new URLSearchParams(window.location.search).get('search') || '');
	return (
		<div className="navbar">
			<div className="navbar__logo">
				<h1>
					Compare<span>Now</span>
				</h1>
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
