import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";
import uuid from "uuid";

const initialState = {
	items: [
		{ id: uuid(), name: "Apples" },
		{ id: uuid(), name: "Kiwis" },
		{ id: uuid(), name: "Papayas" },
		{ id: uuid(), name: "Mangos" }
	]
};

const itemReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ITEMS:
			return { ...state };
		case ADD_ITEM:
			return { ...state, items: [ ...state.items, action.payload ] };
		case DELETE_ITEM:
			return {
				...state,
				items: [ ...state.items.filter((item) => item.id !== action.payload) ]
			};
		default:
			return state;
	}
};

export default itemReducer;
