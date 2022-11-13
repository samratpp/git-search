import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
	const data: any = useSelector((state) => state);
	const addedBookMarks = data?.bookmark?.repo;
	return (
		<div className="search__bookmark">
			{addedBookMarks.length > 0 ? (
				addedBookMarks.map(({ full_name, owner, description }: any) => {
					return (
						<div className="search__bookmark--box">
							<Link
								to={`/repo/${full_name}`}
								className="search__bookmark--repo"
							>
								{full_name.split('/').pop()}
							</Link>
							<p className="search__bookmark--owner">{owner.login}</p>
							<p className="search__bookmark--desc">{description}</p>
						</div>
					);
				})
			) : (
				<p>No Bookmarks Found</p>
			)}
		</div>
	);
};

export default Bookmarks;
