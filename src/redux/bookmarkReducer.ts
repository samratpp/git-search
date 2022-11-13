const SET_BOOKMARK = 'SET_BOOKMARK';
const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

export const setBookmark = (repo: any) => {
	return {
		type: SET_BOOKMARK,
		payload: repo,
	};
};

export const removeBookmark = (id: any) => {
	return {
		type: REMOVE_BOOKMARK,
		payload: id,
	};
};

const initialState = {
	repo: [],
};

interface iAction {
	type: string;
	payload: any;
}

export const bookmarkReducer = (
	state = initialState,
	{ type, payload }: iAction
) => {
	switch (type) {
		case SET_BOOKMARK:
			return {
				...state,
				repo: [...state.repo, payload],
			};

		case REMOVE_BOOKMARK:
			return {
				...state,
				repo: [...state.repo.filter((item: any) => item.id !== payload)],
			};

		default:
			return state;
	}
};
