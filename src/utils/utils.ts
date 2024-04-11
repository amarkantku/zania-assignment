export const sleep = (ms: number): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

export const placeholderCards = Array.from({ length: 5 }, (_, index) => index);
