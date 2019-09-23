import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types";
import uuid from "uuid";

export const getItems = () => {
	return { type: GET_ITEMS };
};

export const deleteItem = (id) => {
	return { type: DELETE_ITEM, payload: id };
};

export const addItem = (name) => {
	return {
		type: ADD_ITEM,
		payload: { name, id: uuid() }
	};
};

// export const getItems = () => (dispatch) => {
// 	// API call
// 	// .then(res => res.json())
// 	// .then(posts => dispatch({
// 	//      type: FETCH_POSTS,
// 	// payload: posts
// 	// }))
// 	// };
// };
