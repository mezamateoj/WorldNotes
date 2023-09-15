import styles from './Button.module.css';
function Button({ children, onClick, type }) {
	return (
		<div>
			<button
				className={`${styles.btn} ${styles[type]}`}
				onClick={onClick}
			>
				{children}
			</button>
		</div>
	);
}

export default Button;
