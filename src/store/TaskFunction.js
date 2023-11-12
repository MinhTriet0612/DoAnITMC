import { createSlice } from "@reduxjs/toolkit";

import db from "../Firebase/config";
import { deleteDoc, setDoc, doc } from "firebase/firestore";

const initialData = [];

const toDoListSlice = createSlice({
	name: "To-Do-List",
	initialState: initialData,
	reducers: {
		removeTodo: (state, action) => {
			const { id } = action.payload;
			const currentTodoList = state.filter((todo) => todo.id !== id);

			deleteDoc(doc(db, "todoList", id.toString()));
			return currentTodoList;
		},

		addTodo: (state, action) => {
			const taskText = state.map((item) => item.text.toLowerCase());
			if (
				action.payload.text &&
				action.payload.deadline &&
				taskText.includes(action.payload.text.toLowerCase()) === false
			) {
				// add docs to redux (data on local)
				state.push(action.payload);
				console.log(action.payload);
				// add docs to firebase
				const docRef = doc(db, "todoList", action.payload.id.toString());
				setDoc(docRef, { ...action.payload });
			}

			return state;
		},

		updateTodoTask: (state, action) => {
			const { id, text, option, date, deadline, description, stateTask } =
				action.payload;

			const index = state.findIndex((todo) => todo.id === id);
			state[index] = {
				id: id,
				text: text || state[index].text,
				option: option.value || state[index].option,
				date: date || state[index].date,
				deadline: deadline || state[index].deadline,
				description: description || state[index].description,
				stateTask: stateTask || state[index].stateTask,
			};
			console.log(state);
			// update docs to firebase
			const docRef = doc(db, "todoList", id.toString());
			setDoc(docRef, { ...state[index] });
		},

		// update docs to firebase
		// const docRef = doc(db, "todoList", id.toString());
		// setDoc(docRef, { ...action.payload });

		updateFullStateTask: (state, action) => {
			return action.payload;
		},
	},
});

export const { updateTodoTask, removeTodo, addTodo, updateFullStateTask } =
	toDoListSlice.actions;
export default toDoListSlice.reducer;
