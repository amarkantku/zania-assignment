import { useEffect, useState } from 'react';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import CardList from './pages/CardList/CardList';
import { ICard } from './types';
import { sleep } from './utils/utils';

function App() {
	const [loading, setLoading] = useState<boolean>(false);
	const [cards, setCardData] = useState<ICard[]>([]);
	const [value, updateValue] = useLocalStorage('cards', [] as ICard[]);

	useEffect(() => {
		// fetch cards
		const fetchCards = async (): Promise<ICard[]> => {
			const response = await fetch('/cards');
			await sleep(2000); // only for simulation
			const data = await response.json();
			return data as ICard[];
		};

		// if value present in local storage get it from local storage and update the state
		if (value?.length) {
			setCardData(value);
		} else {
			// else fetch from mock api and update the state and local storage
			setLoading(true);
			fetchCards().then((cards: ICard[]) => {
				setCardData(cards);
				updateValue(cards);
				setLoading(false);
			});
		}
	}, [value, updateValue]);

	return (
		<div>
			<header className="header">Card Drag & Drop Demo</header>
			<CardList cards={cards} isloading={loading} />;
		</div>
	);
}

export default App;
