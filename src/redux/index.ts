import { combineReducers } from 'redux';
import { userReducer } from './reducer';
import { bookmarkReducer } from './bookmarkReducer';

const reducers = combineReducers({
	user: userReducer,
	bookmark: bookmarkReducer,
});

export default reducers;
