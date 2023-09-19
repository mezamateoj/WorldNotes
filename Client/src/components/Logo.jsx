import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

function Logo() {
	return (
		<Link to={'/'}>
			<img
				src="/logo2.svg"
				alt="world-wise logo"
				className={styles.logo}
			/>
		</Link>
	);
}

export default Logo;
