import PageNav from '../components/PageNav';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<main className={styles.homepage}>
			<PageNav />
			<section>
				<h1>
					You travel the world.
					<br />
					WorldNotes keeps track of your adventures.
				</h1>
				<h2>
					A world map that tracks your footsteps into every city you
					can think of. Never forget your wonderful experiences
				</h2>
				<Link to="/login" className="cta">
					Start tracking now
				</Link>
			</section>
		</main>
	);
}
