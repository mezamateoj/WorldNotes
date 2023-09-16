import React, { useState } from 'react';
import styles from './editNotes.module.css';

const EditNotes = ({ notes, setNotes }) => {
	return (
		<div>
			<div className={styles.row}>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>
		</div>
	);
};

export default EditNotes;
