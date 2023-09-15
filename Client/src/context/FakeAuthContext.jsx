import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuth: false,
};

function reducer(state, action) {
	switch (action.type) {
		case 'login':
			return {
				...state,
				user: action.payload,
				isAuth: true,
			};
		case 'logout':
			return {
				...state,
				user: null,
				isAuth: false,
			};
		default:
			throw new Error(`Unrecognized action: ${action.type}`);
	}
}

const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'Qwerty934092439',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

export function AuthProvider({ children }) {
	const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

	function login(email, password) {
		try {
			if (email === FAKE_USER.email && password === FAKE_USER.password) {
				dispatch({ type: 'login', payload: FAKE_USER });
			}
		} catch (error) {
			console.error(error);
		}
	}

	function logout() {
		dispatch({ type: 'logout' });
	}

	return (
		<AuthContext.Provider value={{ user, isAuth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}
