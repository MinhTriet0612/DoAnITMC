import React, { useEffect } from "react";
import db from "../Firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateFullStateTask } from "../store/TaskFunction";
import TodoList from "../components/TodoList";

const Menu = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		getData().then((data) => dispatch(updateFullStateTask(data)));
	}, []);

	const getData = async () => {
		const querySnapshot = await getDocs(collection(db, "todoList"));
		const data = querySnapshot.docs.map((doc) => doc.data());
		return data;
	};

	return <TodoList />;
};

export default Menu;
