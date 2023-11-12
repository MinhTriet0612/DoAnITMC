import { createSlice } from "@reduxjs/toolkit";

const initialData = {
	UnFinished: 0,
	Doing: 0,
	Finished: 0,
	Caceled: 0,
	Expired: 0,
};

const toDoListSlice = createSlice({
	name: "To-Do-List",
	initialState: initialData,
	reducers: {
		calculate: (state, action) => {
			const amountTaskClone = {
				UnFinished: 0,
				Doing: 0,
				Finished: 0,
				Caceled: 0,
				Expired: 0,
			};

			const TodoList = action.payload;
			TodoList.forEach((task) => {
				if (task.stateTask === "UnFinished") {
					amountTaskClone.UnFinished++;
				} else if (task.stateTask === "Doing") {
					amountTaskClone.Doing++;
				} else if (task.stateTask === "Finished") {
					amountTaskClone.Finished++;
				} else if (task.stateTask === "Caceled") {
					amountTaskClone.Caceled++;
				} else if (task.stateTask === "Expired") {
					amountTaskClone.Expired++;
				}
			});
			return amountTaskClone;
		},
	},
});

export const { calculate } = toDoListSlice.actions;
export default toDoListSlice.reducer;
