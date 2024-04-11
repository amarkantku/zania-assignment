import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
	return (
		<div className="loader__overlay">
			<div className="loader__spinner"></div>
		</div>
	);
};

export default Loader;
