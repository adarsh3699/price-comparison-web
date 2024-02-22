import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './component/navbar/Navbar';
import ItemContainer from './component/itemContainer/ItemContainer';
import PaginationBox from './component/paginationBox/PaginationBox';
import ShowMsg from './component/showMsg/ShowMsg';
import Loader from './component/loader/Loader';

import './style/App.css';

const apiBaseUrl = 'https://easy-tuna-long-underwear.cyclic.app/';
// const apiBaseUrl = 'http://localhost:3000/';

function App() {
	const [data, setData] = useState({});
	const [page, setpage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState('');
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
		async (e, isParams) => {
			if (!isParams) e.preventDefault();
			const searchText = e.target?.searchBox?.value?.trim();
			if (!searchText) return handleMsgShown('Please enter a search term');
			if (!isParams) navigate('/?search=' + searchText);

			try {
				setLoading(true);
				const response = await fetch(apiBaseUrl + '?search=' + searchText + '&page=' + page);
				const data = await response.json();
				if (response.status === 200) {
					setData(data);
					console.log(data);
				} else {
					handleMsgShown(data?.message);
				}
			} catch (e) {
				console.log(e);
			} finally {
				setLoading(false);
			}
		},
		[handleMsgShown, navigate, page]
	);

	useEffect(() => {
		const search = new URLSearchParams(window.location.search).get('search');
		if (search) {
			handleSearch({ target: { searchBox: { value: search } } }, true);
		}
	}, []);

	return (
		<>
			<Navbar handleSearch={handleSearch} />
			<Loader isLoading={loading} />
			{data?.data?.map((item) => {
				return <ItemContainer key={item?.id} item={item} />;
			})}
			{/* <PaginationBox data={data} page={page} setpage={setpage} handleSearch={handleSearch} /> */}
			{msg && <ShowMsg msgText={msg?.text} type={msg?.type} />}
		</>
	);
}

export default App;
