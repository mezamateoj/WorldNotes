import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './context/CitiesContex';
import { AuthProvider } from './context/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

// const BASE_URL = 'http://localhost:8000';

function App() {
	// const [cities, setCities] = useState([]);
	// const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	async function fetchCities() {
	// 		try {
	// 			setLoading(true);
	// 			const response = await fetch(`${BASE_URL}/cities`);
	// 			const data = await response.json();
	// 			setCities(data);
	// 		} catch (error) {
	// 			console.log(error.message);
	// 			alert('There was an error. Please try again later.');
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}
	// 	fetchCities();
	// }, []);

	return (
		<div>
			<AuthProvider>
				<CitiesProvider>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/product" element={<Product />} />
						<Route path="/pricing" element={<Pricing />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/app"
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route
								index
								element={<Navigate replace to="cities" />}
							/>
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<Form />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</CitiesProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
