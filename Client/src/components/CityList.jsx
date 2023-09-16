import { Link, NavLink } from 'react-router-dom';
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';
import { useCities } from '../context/CitiesContex';

function CityList() {
	const { cities, loading } = useCities();
	console.log(cities);
	if (loading) return <Spinner />;
	if (!cities.length) return <Message message="No cities found" />;
	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem key={city.id} city={city} />
			))}
		</ul>
	);
}

export default CityList;
