import { useParams } from 'react-router-dom';
import styles from './City.module.css';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { useCities } from '../context/CitiesContex';
import BackButton from './BackButton';
import Button from './Button';
import EditNotes from './EditNotes/EditNotes';

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));

function City() {
	const [edit, setEdit] = useState(false);
	const [editNotes, setEditNotes] = useState('');

	// get the id from the URL
	const { id } = useParams();
	const { fetchCity, currentCity, loading, editCity } = useCities();

	useEffect(() => {
		fetchCity(id);
	}, [id]);

	const { cityName, emoji, date, notes, country } = currentCity;

	if (loading) return <Spinner />;

	const handleEdit = () => {
		setEdit(!edit);
	};

	const handleConfirm = () => {
		const newNotes = {
			id: id,
			notes: editNotes,
		};
		editCity(newNotes);
		setEdit(!edit);
	};

	console.log(editNotes);

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h3>{country}</h3>
				<h2>{cityName}</h2>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					{edit ? (
						<EditNotes notes={editNotes} setNotes={setEditNotes} />
					) : (
						<p>{notes}</p>
					)}
					{/* <p>{notes}</p>
					<EditNotes /> */}
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer"
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>
			<div></div>
			<div className={styles.btnContainer}>
				<BackButton />
				{edit ? (
					<Button type="primary" onClick={handleConfirm}>
						Confirm
					</Button>
				) : (
					<Button type="primary" onClick={handleEdit}>
						Edit
					</Button>
				)}
			</div>
		</div>
	);
}

export default City;
