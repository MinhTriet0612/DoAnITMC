import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { updateTodoTask, removeTodo } from "../store/TaskFunction";

const Todo = ({ todos }) => {
	const dispatch = useDispatch();

	const [edit, setEdit] = useState({
		id: null,
		value: false,
	});

	const submitUpdate = (value) => {
		dispatch(
			updateTodoTask({
				id: edit.id,
				text: value.text,
				option: value.option,
				deadline: value.deadline,
				description: value.description,
				startDay: value.startDay,
				stateTask: value.stateTask,
			})
		);

		setEdit({ id: null, value: false });
	};

	const removeTodoAction = (id) => {
		dispatch(removeTodo(id));
	};

	// function update StateTaskAmount after update ToDoTask

	if (edit.value) {
		return <TodoForm edit={edit} onSubmit={submitUpdate} />;
	}

	return todos.map((todo, index) => (
		<div className="todo-row" key={index}>
			<div key={todo.id}>
				Nhiệm vụ: {todo.text} || Tình trạng: {todo.stateTask} || Mục Tiêu:{" "}
				{todo.option.target} || Ngày tạo: {todo.startDay}|| Deadline:{" "}
				{todo.deadline} || Mô tả: {todo.description}
			</div>

			<div className="icons">
				<RiCloseCircleLine
					onClick={() => removeTodoAction(todo.id)}
					className="delete-icon"
				/>
				<TiEdit
					onClick={() =>
						setEdit({
							id: todo.id,
							value: true,
						})
					}
					className="edit-icon"
				/>
			</div>
		</div>
	));
};

export default Todo;
