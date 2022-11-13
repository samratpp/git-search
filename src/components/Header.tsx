import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<nav className="header__main">
				<ul className="header__main--list">
					<li>
						<Link to="/" className="header__main--title">
							&lt; Git Search /&gt;
						</Link>
					</li>
					<li>
						<Link to="/bookmarks" className="header__main--link">
							Bookmarks
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Header;
