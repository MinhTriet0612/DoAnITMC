import React from "react";
import "./App.css";
import JsonDowload from "./JsonDowload/jsonfile";
import Menu from "./page/Menu";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddTaskPage from "./page/AddTask";
import EditTaskPage from "./page/EditTask";

// get data from firebase

function App() {
	const router = createBrowserRouter([
		{
			path: "/DoAnITMC",
			element: <Menu />,
		},
		{
			path: "/DoAnITMC/add-task",
			element: <AddTaskPage />,
		},
		{
			path: "/DoAnITMC/edit-task/:id",
			element: <EditTaskPage />,
		},
	]);

	return (
		<div className="todo-app">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
