import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import Navbar from './Navbar/Navbar';
import Routes from './routes/Routes';
import JoblyApi from './api';
import UserContext from './auth/UserContext';
import jwt from 'jsonwebtoken';
import LoadingSpinner from './common/LoadingSpinner';

export const TOKEN_STORAGE_ID = 'jobly-token';

function App() {
	const [ infoLoaded, setInfoLoaded ] = useState(false);
	const [ applicationIds, setApplicationIds ] = useState(new Set([]));
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);

	console.debug('App', 'infoLoaded=', infoLoaded, 'currentUser=', currentUser, 'token=', token);

	useEffect(
		function loadUserInfo() {
			async function getCurrentUser() {
				if (token) {
					try {
						let { username } = jwt.decode(token);
						JoblyApi.token = token;
						let currentUser = await JoblyApi.getCurrentUser(username);
						setCurrentUser(currentUser);
						setApplicationIds(new Set(currentUser.applications));
					} catch (err) {
						console.error('App loadUserInfo: problem loading', err);
						setCurrentUser(null);
					}
				}
				setInfoLoaded(true)
			}
			setInfoLoaded(false);
			getCurrentUser();
		},
		[ token ]
	);

	function logout() {
		setCurrentUser(null);
		setToken(null);
	}

	async function signup(signupData) {
		try {
			let token = await JoblyApi.signup(signupData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			console.error('signup failed', errors);
			return { success: false, errors };
		}
	}

	async function login(loginData) {
		try {
			let token = await JoblyApi.login(loginData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			console.error('login failed', errors);
			return { success: false, errors };
		}
	}

	function hasAppliedToJob(id) {
		return applicationIds.has(id);
	}

	function applyToJob(id) {
		if (hasAppliedToJob(id)) return;
		JoblyApi.applyToJob(currentUser.username, id);
		setApplicationIds(new Set([ ...applicationIds, id ]));
	}

	if (!infoLoaded) return <LoadingSpinner />;

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
				<div id='main'>
					<Navbar logout={logout} />
					<Routes login={login} signup={signup} />
				</div>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
