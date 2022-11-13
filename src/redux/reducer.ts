export const SET_REPOS = 'SET_REPOS';

export const setRepos = (user: any) => {
	return {
		type: SET_REPOS,
		payload: user,
	};
};

const initialState = {
	user: [],
};

interface iAction {
	type: string;
	payload: any;
}

export const userReducer = (
	state = initialState,
	{ type, payload }: iAction
) => {
	switch (type) {
		case SET_REPOS:
			return {
				...state,
				user: payload,
			};

		default:
			return state;
	}
};
