import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';

export const CitiesContext = createContext();

const BASE_URL = 'http://localhost:8000';

const initialState = {
	cities: [],
	loading: false,
	currentCity: {},
	error: '',
};

function reducer(state, action) {
	switch (action.type) {
		case 'loading': {
			return {
				...state,
				loading: true,
			};
		}
		case 'cities/loaded':
			return {
				...state,
				loading: false,
				cities: action.payload,
			};
		case 'city/loaded':
			return {
				...state,
				loading: false,
				currentCity: action.payload,
			};
		case 'city/created':
			return {
				...state,
				loading: false,
				cities: [...state.cities, action.payload],
			};
		case 'cities/edited':
			return {
				...state,
				loading: false,
				cities: state.cities.map((city) =>
					city.id === action.payload.id
						? { ...city, notes: action.payload.notes }
						: city
				),
				currentCity: {
					...state.currentCity,
					notes: action.payload.notes,
				},
			};
		case 'cities/deleted':
			return {
				...state,
				loading: false,
				cities: state.cities.filter(
					(city) => city.id !== action.payload
				),
			};
		case 'rejected':
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			throw new Error(`Unrecognized action: ${action.type}`);
	}
}

export function CitiesProvider({ children }) {
	const [{ cities, loading, currentCity }, dispatch] = useReducer(
		reducer,
		initialState
	);
	// const [cities, setCities] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [currentCity, setCurrentCity] = useState({});

	useEffect(() => {
		async function fetchCities() {
			try {
				// setLoading(true);
				dispatch({ type: 'loading' });
				const response = await fetch(`${BASE_URL}/notes`);
				const data = await response.json();
				console.log(data);
				// setCities(data);
				dispatch({ type: 'cities/loaded', payload: data });
			} catch (error) {
				console.log(error.message);
				dispatch({
					type: 'rejected',
					payload: 'There was an error. Please try again later.',
				});
			}
		}
		fetchCities();
	}, []);

	async function fetchCity(id) {
		console.log(id);
		if (Number(id) === currentCity.id) return;
		try {
			// setLoading(true);
			dispatch({ type: 'loading' });
			const response = await fetch(`${BASE_URL}/notes/${id}`);
			const data = await response.json();
			console.log(data);
			dispatch({ type: 'city/loaded', payload: data });
			// setCurrentCity(data);
		} catch (error) {
			console.log(error.message);
			// alert('There was an error. Please try again later.');
			dispatch({
				type: 'rejected',
				payload: 'There was an error. Please try again later.',
			});
		}
	}

	async function createCity(newCity) {
		try {
			// setLoading(true);
			dispatch({ type: 'loading' });
			const response = await fetch(`${BASE_URL}/notes/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCity),
			});
			const data = await response.json();
			console.log(data);
			dispatch({ type: 'city/created', payload: data });
			// setCities([...cities, data]);
			// setCurrentCity(data);
		} catch (error) {
			console.log(error.message);
			dispatch({
				type: 'rejected',
				payload: 'There was an error. Please try again later.',
			});
			// alert('There was an error. Please try again later.');
		}
	}

	async function editCity(newNotes) {
		try {
			// setLoading(true);
			dispatch({ type: 'loading' });
			const { id, notes } = newNotes;
			console.log(newNotes);
			await fetch(`${BASE_URL}/notes/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ notes }),
			});
			dispatch({ type: 'cities/edited', payload: newNotes });

			// setCities(cities.filter((city) => city.id !== id));
			// setCurrentCity(data);
		} catch (error) {
			console.log(error.message);
			dispatch({
				type: 'rejected',
				payload: 'There was an error. Please try again later.',
			});
			// alert('There was an error. Please try again later.');
		}
	}

	async function deleteCity(id) {
		try {
			// setLoading(true);
			dispatch({ type: 'loading' });
			await fetch(`${BASE_URL}/notes/${id}`, {
				method: 'DELETE',
			});
			dispatch({ type: 'cities/deleted', payload: id });
			// setCities(cities.filter((city) => city.id !== id));
			// setCurrentCity(data);
		} catch (error) {
			console.log(error.message);
			dispatch({
				type: 'rejected',
				payload: 'There was an error. Please try again later.',
			});
			// alert('There was an error. Please try again later.');
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				// setCities,
				loading,
				currentCity,
				fetchCity,
				createCity,
				editCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

export function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) {
		throw new Error('useCities must be used within a CitiesProvider');
	}
	return context;
}
