import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRepos } from '../redux/reducer';
import { searchRepos } from '../services';

interface iRepoData {
	incomplete_results: boolean;
	items: [
		{
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
	];
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
	const [noOfPages, setNoOfPages] = useState(1);
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
			setNoOfPages(
				Math.ceil(responseData?.total_count / responseData?.items?.length)
			);
		}
	}, [responseData]);

	let paginationOptions: [JSX.Element] = [
		<option key={0} value={1}>
			Page no 1
		</option>,
	];

	if (noOfPages > 1) {
		for (let i: number = 1; i < noOfPages; i++) {
			if (i <= 20) {
				paginationOptions.push(
					<option key={i} value={i + 1}>
						Page no {i + 1}
					</option>
				);
			}
		}
	}

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
				<select
					onChange={(e) => setPerPage(Number(e.target.value))}
					className="search__main--select"
				>
					<option value="10">10 Per Page</option>
					<option value="20">20 Per Page</option>
					<option value="30">30 Per Page</option>
					<option value="40">40 Per Page</option>
					<option value="50">50 Per Page</option>
				</select>
				{noOfPages > 1 && (
					<select
						onChange={(e) => setPage(Number(e.target.value))}
						className="search__main--select"
					>
						{paginationOptions}
					</select>
				)}
				<button onClick={() => searchResult()} className="search__main--submit">
					Submit
				</button>
			</div>
			<div className="search__main--details">
				{responseData &&
					responseData?.items?.length > 0 &&
					`Showing ${responseData?.items?.length} out of ${responseData?.total_count} items`}
			</div>
		</div>
	);
};

export default Search;
