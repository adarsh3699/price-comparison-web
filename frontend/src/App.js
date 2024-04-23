import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './component/navbar/Navbar';
import ItemContainer from './component/itemContainer/ItemContainer';
import SearchBox from './component/searchBox/searchBox';
import EmptyCart from './component/emptyCart/EmptyCart';
import ShowMsg from './component/showMsg/ShowMsg';
import Loader from './component/loader/Loader';
import PaginationBox from './component/paginationBox/PaginationBox';
import FootBar from './component/footer/FootBar';

import './style/App.css';

const apiBaseUrl = 'https://easy-tuna-long-underwear.cyclic.app/';
// const apiBaseUrl = 'http://localhost:3000/';

function App() {
	const [data, setData] = useState({});
	const [page, setpage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState('');
	const [searchText, setSearchText] = useState(new URLSearchParams(window.location.search).get('search') || '');

	const navigate = useNavigate();

	const handleMsgShown = useCallback((msgText, type) => {
		if (msgText) {
			setMsg({ text: msgText, type: type });
			setTimeout(() => {
				setMsg({ text: '', type: '' });
			}, 2500);
		} else {
			console.log('Please Provide Text Msg');
		}
	}, []);

	const handleSearch = useCallback(
		async (e, isParams, currentPage) => {
			if (!isParams) e.preventDefault();
			const searchText = e.target?.searchBox?.value?.trim();
			if (!searchText) return handleMsgShown('Please enter a search term');
			if (!isParams) navigate('/?search=' + searchText);
			if (!currentPage) currentPage = new URLSearchParams(window.location.search).get('page');
			setSearchText(searchText);
			try {
				setLoading(true);
				const response = await fetch(apiBaseUrl + '?search=' + searchText + '&page=' + currentPage);
				const data = await response.json();
				if (response.status === 200) {
					setData(data);
				} else {
					handleMsgShown(data?.message);
				}
			} catch (e) {
				console.log(e);
				handleMsgShown('Something went wrong');
			} finally {
				setLoading(false);
			}
		},
		[handleMsgShown, navigate]
	);

	useEffect(() => {
		const search = new URLSearchParams(window.location.search).get('search');
		if (search) {
			handleSearch({ target: { searchBox: { value: search } } }, true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handlePageChange = useCallback(
		(page) => {
			if (page < 1) return handleMsgShown('You are already on first page');

			setpage(page);
			const search = new URLSearchParams(window.location.search).get('search');
			navigate('/?search=' + search + '&page=' + page);
			window.scrollTo(0, 0);
			handleSearch({ target: { searchBox: { value: search } } }, true, page);
		},
		[handleMsgShown, navigate, handleSearch]
	);

	const resetToHomePage = useCallback(() => {
		navigate('/');
		setData({});
		setpage(1);
		setSearchText('');
		window.scrollTo(0, 0);
	}, [navigate]);

	const handleProductClick = useCallback(
		async (id) => {
			try {
				const response = await fetch(apiBaseUrl + 'product/' + id);
				const data = await response.json();
				if (response.status === 200) {
					window.open(data.productUrl, '_blank').focus();
				} else {
					handleMsgShown(data?.message);
				}
			} catch (e) {
				console.log(e);
				handleMsgShown('Something went wrong');
			}
		},
		[handleMsgShown]
	);

	return (
		<>
			<Navbar
				handleSearch={handleSearch}
				resetToHomePage={resetToHomePage}
				searchText={searchText}
				setSearchText={setSearchText}
			/>
			<div className="appContainer" style={data?.data ? { padding: 'unset' } : null}>
				<Loader isLoading={loading} />

				{!data?.data && !searchText && <SearchBox handleSearch={handleSearch} />}

				{data?.data?.length === 0 && <EmptyCart />}

				{data?.data?.map((item) => {
					return <ItemContainer key={item?.id} item={item} handleProductClick={handleProductClick} />;
				})}

				{data?.data?.length > 0 && (
					<PaginationBox
						handlePageChange={handlePageChange}
						page={page}
						setpage={setpage}
						handleSearch={handleSearch}
					/>
				)}
			</div>
			<FootBar />
			{msg && <ShowMsg msgText={msg?.text} type={msg?.type} />}
		</>
	);
}

export default App;
