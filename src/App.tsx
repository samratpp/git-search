import { Route, Routes } from 'react-router-dom';
import './styles/_global.scss';
import Header from './components/Header';
import Bookmarks from './pages/Bookmarks';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Repo from './pages/Repo';

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="bookmarks" element={<Bookmarks />} />
				<Route path="repo/:owner/:repo" element={<Repo />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
