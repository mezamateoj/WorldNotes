import { useEffect } from 'react';
import { useAuth } from '../context/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
	const { isAuth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) {
			navigate('/');
		}
	}, [isAuth, navigate]);

	return isAuth ? children : null;
}

export default ProtectedRoute;
