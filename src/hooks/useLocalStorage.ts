import { useState } from 'react';

// represent the type of data that can be stored
type LocalStorageValue<T> = T | null;

type LocalStorageReturnType<T> = [
	LocalStorageValue<T>, // value
	(value: LocalStorageValue<T>) => void, // setter function
];

const useLocalStorage = <T>(
	key: string,
	initialValue: LocalStorageValue<T>
): LocalStorageReturnType<T> => {
	// Get initial value if any or default value
	const storedValue: LocalStorageValue<T> = (() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error('Error reading from localStorage:', error);
			return initialValue;
		}
	})();

	// Create state to store the current value
	const [value, setValue] = useState<LocalStorageValue<T>>(storedValue);

	// Update localStorage and state when the value changes
	const updateValue = (newValue: LocalStorageValue<T>) => {
		try {
			if (newValue === null) {
				window.localStorage.removeItem(key);
			} else {
				window.localStorage.setItem(key, JSON.stringify(newValue));
			}
			setValue(newValue);
		} catch (error) {
			console.error('Error writing to localStorage:', error);
		}
	};

	return [value, updateValue];
};

export default useLocalStorage;
