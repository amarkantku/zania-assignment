import React from 'react';
import { ICard as ICardDetails } from '../../../../types';

interface ICardProps {
	cardDetails: ICardDetails;
	draggable?: boolean;
	onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
	onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
	onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Card = ({
	cardDetails,
	draggable = false,
	onDragStart,
	onDragOver,
	onDrop,
	onClick,
}: ICardProps): JSX.Element => {
	return (
		<div
			draggable={draggable}
			className="card-list__item"
			onClick={onClick}
			onDragStart={onDragStart}
			onDragOver={onDragOver}
			onDrop={onDrop}
		>
			<img src={cardDetails.image} alt={cardDetails.title} className="card-list__item-image" />
			<div className="card-list__item-title">{cardDetails.title}</div>
		</div>
	);
};

export default React.memo(Card);
