import React, { useEffect, useState } from 'react';
import { ICard } from '../../types';
import './CardList.css';
import Card from './template/Card/Card';
import Modal from '../../components/Modal/Modal';
import PlaceholderCard from './template/PlaceholderCard/PlaceholderCard';
import { placeholderCards } from '../../utils/utils';

interface ICardListProps {
	cards: ICard[];
	isloading: boolean;
}

const CardList = ({ cards, isloading }: ICardListProps): JSX.Element => {
	// State to keep the cards details
	const [cardItems, setCardItems] = useState<ICard[]>([]);
	// State to keep track of the cards details that got dragged to place on other cards locations
	const [draggedCard, setDraggedCard] = useState<ICard | null>(null);
	// State to kee the track of the selected card index
	const [sourceIndex, setSourceIndex] = useState<number>(0);
	// State to keep track of the card details to be viwed in modal on card click
	const [selectedCard, setSelectedCard] = useState<ICard | null>(null);

	useEffect(() => {
		setCardItems(cards);
	}, [cards]);

	const handleDragStart = (event: React.DragEvent<HTMLDivElement>, card: ICard, index: number) => {
		setDraggedCard(card);
		setSourceIndex(index);
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/html', event.currentTarget.id);
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
		event.preventDefault();
		if (draggedCard && index !== sourceIndex) {
			const updatedCards = [...cardItems];
			updatedCards.splice(sourceIndex, 1);
			updatedCards.splice(index, 0, draggedCard);
			setCardItems(updatedCards);
		}
	};

	const handleCardClick = (card: ICard) => {
		setSelectedCard(card);
	};

	const handleCloseOnPressESC = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			setSelectedCard(null);
		}
	};

	return (
		<>
			{selectedCard && (
				<Modal isOpen onClose={handleCloseOnPressESC}>
					<Card cardDetails={selectedCard} />
				</Modal>
			)}
			<div className="card-list">
				{isloading
					? placeholderCards.map((index) => <PlaceholderCard key={index} />)
					: cardItems.map((card, index) => (
							<Card
								key={card.id}
								draggable={true}
								cardDetails={card}
								onDragStart={(e) => handleDragStart(e, card, index)}
								onDragOver={(e) => handleDragOver(e)}
								onDrop={(e) => handleDrop(e, index)}
								onClick={() => handleCardClick(card)}
							/>
						))}
			</div>
		</>
	);
};

export default CardList;
