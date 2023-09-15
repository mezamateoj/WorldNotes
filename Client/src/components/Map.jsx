import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../context/CitiesContex';
import useGeolocation from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
	// const navigate = useNavigate();
	const { cities } = useCities();
	const [position, setPosition] = useState([40, 40]);

	const { isLoading, position: geoLocation, getPosition } = useGeolocation();
	// // read the lat and lng from the URL
	// const [searchParams, setSearchParams] = useSearchParams();

	// const lat = searchParams.get('lat');
	// const lng = searchParams.get('lng');

	const [lat, lng] = useUrlPosition();

	useEffect(() => {
		if (lat && lng) {
			setPosition([lat, lng]);
		}
	}, [lat, lng]);

	useEffect(() => {
		console.log(geoLocation);
		if (geoLocation) {
			setPosition([geoLocation.lat, geoLocation.lng]);
		}
	}, [geoLocation]);

	return (
		<div className={styles.mapContainer}>
			<Button type="position" onClick={getPosition}>
				{isLoading ? 'Loading...' : 'Use your location'}
			</Button>
			<MapContainer
				className={styles.map}
				center={position}
				zoom={8}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							{city.emoji} {city.cityName}
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={position} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position, 8);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}

export default Map;
