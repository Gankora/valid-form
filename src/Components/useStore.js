import { useState } from 'react';

const initialState = {
	email: '',
	password: '',
	secondPassword: '',
};

export const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};
