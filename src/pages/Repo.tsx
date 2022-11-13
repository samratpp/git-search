import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchSingleRepo } from '../services';
import watch from '../assets/watch.png';
import fork from '../assets/fork.png';
import star from '../assets/star.png';

interface iParams {
	owner: string;
	repo: string;
}

interface iRepoData {
	id: number;
	full_name: string;
	html_url: string;
	owner: {
		avatar_url: string;
		login: string;
		html_url: string;
	};
	stargazers_count: number;
	watchers: number;
	forks: number;
	description: string;
	updated_at: string;
	open_issues: number;
	default_branch: number;
}

const Repo = () => {
	const { owner, repo } = useParams();
	const [response, setResponse] = useState<iRepoData>();

	const params: iParams = {
		owner: owner || '',
		repo: repo || '',
	};

	const searchRepo = async () => {
		if (owner && repo) {
			const response = await searchSingleRepo(params);
			setResponse(response);
		}
	};

	useEffect(() => {
		searchRepo();
	}, []);

	return (
		<div className="search__repo">
			{response && (
				<>
					<img
						src={response.owner.avatar_url}
						alt={response.owner.login}
						width="100"
						className="search__repo--avatar"
					/>
					<p>
						<a
							href={response.html_url}
							target="_blank"
							rel="noreferrer"
							className="search__repo--repolink"
						>
							{response.full_name}
						</a>
					</p>
					<p>
						<a
							href={response.owner.html_url}
							target="_blank"
							rel="noreferrer"
							className="search__repo--owner"
						>
							{response.owner.login}
						</a>
					</p>
					<div className="search__repo--stats">
						<span>
							<img src={star} alt={response.full_name} />{' '}
							{response.stargazers_count}
						</span>
						<span>
							<img src={watch} alt={response.full_name} /> {response.watchers}
						</span>
						<span>
							<img src={fork} alt={response.full_name} /> {response.forks}
						</span>
					</div>
					<p className="search__repo--desc">{response.description}</p>
					<p className="search__repo--date">{response.updated_at}</p>
					<p className="search__repo--issues">{response.open_issues} issues</p>
					<p className="search__repo--branch">{response.default_branch}</p>
				</>
			)}
		</div>
	);
};

export default Repo;
