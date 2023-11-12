import TaskFunction from "./TaskFunction";
import FilterFunction from "./FilterFunction";
import AmountStateTaskReducer from "./AmountStateTask";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		task: TaskFunction,
		filterTask: FilterFunction,
		AmountStateTask: AmountStateTaskReducer,
	},
});

export default store;
