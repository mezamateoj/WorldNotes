import { useCities } from '../context/CitiesContex';
import CityItem from './CityItem';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CountryList() {
	const { cities, loading } = useCities();
	if (loading) return <Spinner />;
	if (!cities.length) return <Message message="No cities found" />;

	const countries = cities.reduce((acc, city) => {
		if (!acc.map((c) => c.country).includes(city.country)) {
			return [
				...acc,
				{ country: city.country, id: city.id, emoji: city.emoji },
			];
		} else {
			return acc;
		}
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem key={country.id} country={country} />
			))}
		</ul>
	);
}

export default CountryList;
