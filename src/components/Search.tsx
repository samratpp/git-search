import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRepos } from '../redux/reducer';
import { searchRepos } from '../services';

interface iRepoData {
	id: number;
	incomplete_results: string;
	items: {
		full_name: string;
		owner: {
			login: string;
		};
		stargazers_count: number;
		watchers: number;
		forks: number;
		description: string;
		updated_at: string;
	};
	total_count: number;
}

interface iParams {
	page: number;
	per_page: number;
	sort: string;
	order: string;
}

const Search = () => {
	const dispatch = useDispatch();
	const [searchPhrase, setSearchPhrase] = useState<string>('');
	const [responseData, setResponseData] = useState<iRepoData>();
	const [orderBy, setOrderBy] = useState('desc');
	const [sortBy, setSortBy] = useState('stars');
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	// `&page,per_page,sort,order}",
	let params: iParams = {
		page: page,
		per_page: perPage,
		sort: sortBy,
		order: orderBy,
	};

	const searchResult = async () => {
		if (searchPhrase) {
			const response: iRepoData = await searchRepos(searchPhrase, params);
			setResponseData(response);
		}
	};

	useEffect(() => {
		if (responseData) {
			dispatch(setRepos(responseData.items));
		}
	}, [responseData]);

	return (
		<div className="search__main">
			<input
				type="text"
				value={searchPhrase}
				placeholder="Search GitHub"
				onChange={(e) => setSearchPhrase(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && searchResult()}
				className="search__main--input"
			/>
			<div className="search__main--options">
				<select
					onChange={(e) => setSortBy(e.target.value)}
					className="search__main--select"
				>
					<option value="stars">Stars</option>
					<option value="forks">Forks</option>
					<option value="updated">Date</option>
				</select>
				<select
					onChange={(e) => setOrderBy(e.target.value)}
					className="search__main--select"
				>
					<option value="desc">Desc</option>
					<option value="asc">Asc</option>
				</select>
				<button onClick={() => searchResult()} className="search__main--submit">
					Submit
				</button>
			</div>
		</div>
	);
};

export default Search;
