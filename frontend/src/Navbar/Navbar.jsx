import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import './Navbar.css';

const Navbar = ({ logout }) => {
	const { currentUser } = useContext(UserContext);

	const ifLoggedIn = () => {
		return (
			<div>
				<ul>
					<li>
						<Link to="/jobs">Jobs</Link>
					</li>
					<li>
						<NavLink to="/companies">Companies</NavLink>
					</li>
					<li>
						<NavLink to="/profile">Profile</NavLink>
					</li>
					<li>
						<Link to="/" onClick={logout}>
							Log Out
						</Link>
					</li>
				</ul>
			</div>
		);
	};

	const ifLoggedOut = () => {
		return (
			<ul>
				<li>
					<Link to="/">Jobly</Link>
				</li>
				<li>
					<NavLink to="/login">Login</NavLink>
				</li>
				<li>
					<NavLink to="signup">Sign Up</NavLink>
				</li>
			</ul>
		);
	};

	return <nav>{currentUser ? ifLoggedIn() : ifLoggedOut()}</nav>;
};

export default Navbar;
