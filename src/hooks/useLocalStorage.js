import React from "react";

function useLocalStorage(storageKey, fallbackStorage) {
	const [value, setValue] = React.useState(
		JSON.parse(localStorage.getItem(storageKey)) ?? fallbackStorage
	);

	React.useEffect(() => {
		localStorage.setItem(storageKey, JSON.stringify(value));
	}, [value, storageKey]);

	return [value, setValue];
}

export default useLocalStorage;
