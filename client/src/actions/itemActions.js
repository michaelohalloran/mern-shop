import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import uuid from "uuid";
import axios from "axios";

export const getItems = () => (dispatch) => {
	dispatch(setItemsLoading());
	axios
		.get("/api/items")
		.then((res) => {
			dispatch({ type: GET_ITEMS, payload: res.data });
		})
		.catch((err) => console.log("Error in retrieving items: ", err));
};

export const deleteItem = (id) => (dispatch) => {
	dispatch(setItemsLoading());
	axios
		.delete(`api/items/${id}`)
		.then((res) => {
			dispatch({ type: DELETE_ITEM, payload: id });
		})
		.catch((err) => console.log(`Error in deleting: ${err}`));
};

export const addItem = (name) => (dispatch) => {
	dispatch(setItemsLoading());
	axios
		.post("/api/items", { name })
		.then((res) => {
			dispatch({ type: ADD_ITEM, payload: res.data });
		})
		.catch((err) => console.log(`Error in posting item: ${err}`));
};

export const setItemsLoading = () => {
	return { type: ITEMS_LOADING };
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
