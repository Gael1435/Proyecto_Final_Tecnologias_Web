import { useEffect, useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof globalThis.localStorage === 'undefined') {
            return initialValue;
        }

        try {
            const item = globalThis.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error loading localStorage key', key, error);
            return initialValue;
        }
    });

    useEffect(() => {
        if (typeof globalThis.localStorage === 'undefined') {
            return;
        }

        try {
            globalThis.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error saving localStorage key', key, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};