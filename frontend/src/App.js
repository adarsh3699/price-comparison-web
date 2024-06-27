import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './component/navbar/Navbar';
import ItemContainer from './component/itemContainer/ItemContainer';
import SearchBox from './component/searchBox/searchBox';
import EmptyCart from './component/emptyCart/EmptyCart';
import LoadingDialog from './component/loadingDialog/LoadingDialog';
import ShowMsg from './component/showMsg/ShowMsg';
import Loader from './component/loader/Loader';
import PaginationBox from './component/paginationBox/PaginationBox';
import FootBar from './component/footer/FootBar';

import './style/App.css';

const apiBaseUrl = 'https://comparison-api.bhemu.me/';
// const apiBaseUrl = 'http://localhost:3000/';

function App() {
	const [data, setData] = useState({});
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [ProductIsLoading, setProductIsLoading] = useState(false);
	const [msg, setMsg] = useState('');
	const [searchText, setSearchText] = useState(new URLSearchParams(window.location.search).get('search') || '');

	const navigate = useNavigate();

	const handleMsgShown = useCallback((msgText, type, duration) => {
		if (msgText) {
			setMsg({ text: msgText, type: type });
			setTimeout(() => {
				setMsg({ text: '', type: '' });
			}, duration || 2500);
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
			let isAPIDelay = true;
			try {
				setLoading(true);

				setTimeout(() => {
					if (isAPIDelay) {
						handleMsgShown(
							'Please wait, we are using a free server. it may take some time.',
							'warning',
							5000
						);
					}
				}, 3000);

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
				isAPIDelay = false;
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

	return (
		<>
			<Navbar
				handleSearch={handleSearch}
				setData={setData}
				setPage={setPage}
				searchText={searchText}
				setSearchText={setSearchText}
			/>
			<div className="appContainer" style={data?.data ? { padding: 'unset' } : null}>
				<Loader isLoading={loading} />

				{!data?.data && !loading && <SearchBox handleSearch={handleSearch} />}

				{data?.data?.length === 0 && <EmptyCart />}

				{data?.data?.map((item) => {
					return (
						<ItemContainer
							key={item?.id}
							item={item}
							apiBaseUrl={apiBaseUrl}
							handleMsgShown={handleMsgShown}
							setProductIsLoading={setProductIsLoading}
						/>
					);
				})}

				{data?.data?.length > 0 && (
					<PaginationBox
						page={page}
						setPage={setPage}
						handleSearch={handleSearch}
						handleMsgShown={handleMsgShown}
					/>
				)}
			</div>
			<FootBar />
			{msg && <ShowMsg msgText={msg?.text} type={msg?.type} />}
			{ProductIsLoading && <LoadingDialog setProductIsLoading={setProductIsLoading} />}
		</>
	);
}

export default App;
