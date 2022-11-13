import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeBookmark, setBookmark } from '../redux/bookmarkReducer';
import watch from '../assets/watch.png';
import fork from '../assets/fork.png';
import star from '../assets/star.png';

interface iUserData {
	id: number;
	full_name: string;
	owner: {
		login: string;
	};
	stargazers_count: number;
	watchers: number;
	forks: number;
	description: string;
	updated_at: string;
}

const SearchResults = () => {
	// const [isLoading, setIsLoading] = useState('Loading');
	const dispatch = useDispatch();
	const data: any = useSelector((state) => state);
	const users = data?.user?.user;
	const addedBookMarks = data?.bookmark?.repo;
	const addRemoveBookMark = (
		id: any,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const target = e.target as HTMLInputElement;
		if (target.checked) {
			// add bookmark
			dispatch(setBookmark(id));
		} else {
			// remove bookmark
			dispatch(removeBookmark(id.id));
		}
	};

	const checkBookMark = (id: number) => {
		if (addedBookMarks) {
			for (let i: number = 0; i < addedBookMarks.length; i++) {
				if (addedBookMarks[i].id === id) {
					return true;
				}
			}
		}
		return false;
	};

	return (
		<div className="search__result">
			{users && users.length > 0 ? (
				users.map(
					(
						{
							id,
							full_name,
							owner,
							stargazers_count,
							watchers,
							forks,
							description,
							updated_at,
						}: iUserData,
						i: number
					): any => {
						const isChecked = checkBookMark(id);
						return (
							<div key={id} className="search__result--box">
								<Link
									to={`/repo/${full_name}`}
									className="search__result--repo"
								>
									{full_name.split('/').pop()}
								</Link>
								<p>- {owner.login}</p>
								<div className="search__result--stats">
									<span>
										<img src={star} alt={full_name} /> {stargazers_count}
									</span>
									<span>
										<img src={watch} alt={full_name} /> {watchers}
									</span>
									<span>
										<img src={fork} alt={full_name} /> {forks}
									</span>
								</div>
								<p className="search__result--desc">{description}</p>
								<p className="search__result--date">{updated_at}</p>
								<input
									type="checkbox"
									value={id}
									onChange={(e) =>
										addRemoveBookMark({ id, full_name, owner, description }, e)
									}
									checked={isChecked}
									className="search__result--bookmark"
								/>
							</div>
						);
					}
				)
			) : (
				<p>No Results found</p>
			)}
		</div>
	);
};

export default SearchResults;
