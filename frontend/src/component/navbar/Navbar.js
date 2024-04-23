import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import search_Icon from './search_Icon.svg';

import './navbar.css';

const Navbar = ({ handleSearch, setData, setPage, searchText, setSearchText }) => {
	const navigate = useNavigate();

	const resetToHomePage = useCallback(() => {
		navigate('/');
		setData({});
		setPage(1);
		setSearchText('');
		window.scrollTo(0, 0);
	}, [navigate, setData, setPage, setSearchText]);
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
