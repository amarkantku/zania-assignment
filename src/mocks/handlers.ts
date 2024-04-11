import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('/cards', () =>
		HttpResponse.json([
			{
				id: 1,
				type: 'bankdraft',
				title: 'Bank Draft',
				position: 0,
				image: 'https://placehold.co/600x400',
			},
			{
				id: 2,
				type: 'bill-of-lading',
				title: 'Bill of Lading',
				position: 1,
				image: 'https://placehold.co/600x400',
			},
			{
				id: 3,
				type: 'invoice',
				title: 'Invoice',
				position: 2,
				image: 'https://placehold.co/600x400',
			},
			{
				id: 4,
				type: 'bank-draft-2',
				title: 'Bank Draft 2',
				position: 3,
				image: 'https://placehold.co/600x400',
			},
			{
				id: 5,
				type: 'bill-of-lading-2',
				title: 'Bill of Lading 2',
				position: 4,
				image: 'https://placehold.co/600x400',
			},
		])
	),
];
