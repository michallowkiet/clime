import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(`Error retrieving value from localStorage for key "${key}":`, error);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (error) {
			console.error(`Error setting value in localStorage for key "${key}":`, error);
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue] as const;
};
