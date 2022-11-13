import axios from 'axios';

interface iSearchParams {
	page: number;
	per_page: number;
	sort: string;
	order: string;
}

interface iRepoParams {
	owner: string;
	repo: string;
}

const REPO_SEARCH_URL = 'https://api.github.com/search/repositories?q=';
const REPO_SINGLE_URL = 'https://api.github.com/repos/';

// requests for get, pass in the url "/url/" and params for sort
export const searchRepos = async (query: string, params: iSearchParams) => {
	try {
		const response = await axios({
			method: 'get',
			url: REPO_SEARCH_URL + query,
			params,
		});
		return response.data;
	} catch (err) {
		return err;
	}
};

// requests for get single repo, pass in the owner name and repo name
export const searchSingleRepo = async ({ owner, repo }: iRepoParams) => {
	try {
		const response = await axios({
			method: 'get',
			url: REPO_SINGLE_URL + owner + '/' + repo,
		});
		return response.data;
	} catch (err) {
		return err;
	}
};
