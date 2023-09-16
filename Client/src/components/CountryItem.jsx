import styles from './CountryItem.module.css';

function CountryItem({ country }) {
	return (
		<li className={styles.countryItem}>
			<img
				className={styles.emoji}
				src={`https://www.countryflagicons.com/FLAT/32/${country.countryCode}.png`}
			/>
			{/* <span>{country.emoji}</span> */}
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;
