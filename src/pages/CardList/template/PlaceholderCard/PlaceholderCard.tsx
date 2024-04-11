import React from 'react';
import './PlaceholderCard.css';

const PlaceholderCard: React.FC = () => {
	return (
		<div className="card-list__placeholder">
			<div className="card-list__placeholder-image" />
			<div className="card-list__placeholder-title" />
		</div>
	);
};

export default PlaceholderCard;
