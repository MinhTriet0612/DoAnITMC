import { createSlice } from "@reduxjs/toolkit";

const initialDataClone = [];

const FilterFunctionSlice = createSlice({
	name: "FilterFunction",
	initialState: initialDataClone,
	reducers: {
		filterTask: (state, action) => {
			const { option } = action.payload;
			if (option === "All") {
				return initialDataClone;
			} else if (option === "Completed") {
				return state.filter((item) => item.option === "Completed");
			} else if (option === "Uncompleted") {
				return state.filter((item) => item.option === "Uncompleted");
			}
		},

		//  i want to use state of TodoList.js to find task

		findTask: (state, action) => {
			const { taskValue } = action.payload;
			const tasks = state.filter((task) => task.text === taskValue);
			return tasks;
		},

		clearSearchResult: (state) => {
			return initialDataClone;
		},
	},
});

export const { filterTask, findTask } = FilterFunctionSlice.actions;
export default FilterFunctionSlice.reducer;
