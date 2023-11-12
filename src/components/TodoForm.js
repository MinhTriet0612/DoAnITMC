import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";

function TodoForm(props) {
	const [input, setInput] = useState(props.edit ? props.edit.value : "");

	const inputRef = useRef(null);
	// useRef for description

	const descripRef = useRef("");
	const deadlineRef = useRef("");
	const startDayRef = useRef("");

	const options = [
		{ label: "InDay", value: { target: "InDay", priority: 1 } },
		{ label: "InThreeDay", value: { target: "InThreeDay", priority: 2 } },
		{ label: "InWeek", value: { target: "InWeek", priority: 3 } },
		{ label: "InTwoWeeks", value: { target: "InTwoWeeks", priority: 4 } },
		{ label: "InMonth", value: { target: "InMonth", priority: 5 } },
	];

	const StateTask = [
		{ label: "UnFinished", value: "UnFinished" },
		{ label: "Doing", value: "Doing" },
		{ label: "Finished", value: "Finished" },
		{ label: "Caceled", value: "Caceled" },
		{ label: "Expired", value: "Expired" },
	];

	useEffect(() => {
		inputRef.current.focus();
	});

	const handleChange = (e) => {
		console.log(e.target.value);
		setInput((prev) => {
			console.log(prev);
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleChangeSelect = (value) => {
		console.log(value.value);
		setInput((prev) => {
			console.log(prev);
			return {
				...prev,
				option: value.value,
			};
		});
	};

	const handleChangeStateTask = (value) => {
		console.log(value.value);
		setInput((prev) => {
			console.log(prev);
			return {
				...prev,
				stateTask: value.value,
			};
		});
	};

	// Initialize a date variable
	const today = new Date();
	const todayNormalType =
		today.getFullYear() +
		"-" +
		(Number(today.getMonth()) + 1) +
		"-" +
		today.getDate();

	const handleSubmit = (e) => {
		e.preventDefault();

		props.onSubmit({
			id: Math.floor(Math.random() * 10000),
			text: input.text,
			option: input.option,
			date: todayNormalType,
			startDay: startDayRef.current.value,
			deadline: deadlineRef.current.value,
			description: descripRef.current.value,
			stateTask: input.stateTask ? input.stateTask : "UnFinished",
		});

		console.log(input.option);
		setInput((prev) => {
			return {
				...prev,
				text: "",
			};
		});
	};

	return (
		<form onSubmit={handleSubmit} className="todo-form">
			{props.edit ? (
				<div style={{ display: "flex" }}>
					<input
						placeholder="Update your item"
						onChange={handleChange}
						name="text"
						ref={inputRef}
						className="todo-input edit"
					/>

					<Select
						placeholder="Tinh Trang"
						className="todo-input edit"
						name="stateTask"
						onChange={handleChangeStateTask}
						options={StateTask}
						styles={{
							option: (provided, state) => ({
								...provided,
								color: state.isSelected ? "red" : "blue",
								padding: 20,
							}),
						}}
					/>

					<Select
						className="todo-input edit"
						name="option"
						onChange={handleChangeSelect}
						options={options}
						styles={{
							option: (provided, state) => ({
								...provided,
								color: state.isSelected ? "red" : "blue",
								padding: 20,
							}),
						}}
						placeholder="Level important"
					/>
					<div
						className="designing-form-component-dealine"
						style={{ display: "flex", flexDirection: "column" }}
					>
						<p>Start Day</p>
						<input
							// className="designing-form-component-dealine"
							type="date"
							ref={startDayRef}
							name="startDay"
							data-date-form="DD/MM/YYYY"
							min={new Date().toJSON().slice(0, 10)}
						/>
					</div>

					<div
						className="designing-form-component-dealine"
						style={{ display: "flex", flexDirection: "column" }}
					>
						<p>Deadline</p>
						<input
							type="date"
							ref={deadlineRef}
							name="deadline"
							data-date-form="DD/MM/YYYY"
							min={new Date().toJSON().slice(0, 10)}
						/>
					</div>
					<textarea
						rows={2}
						cols={20}
						className="todo-input edit"
						placeholder="Description"
						name="decription"
						ref={descripRef}
					/>

					<button onClick={handleSubmit} className="todo-button edit">
						Update
					</button>
				</div>
			) : (
				<div className="designing-form-component">
					<input
						placeholder="Add a todo"
						value={input.text}
						onChange={handleChange}
						name="text"
						className="todo-input"
						ref={inputRef}
					/>

					<Select
						className="designing-form-component-level-important"
						name="option"
						onChange={handleChangeSelect}
						options={options}
						styles={{
							option: (provided, state) => ({
								...provided,
								color: state.isSelected ? "red" : "blue",
								padding: 20,
							}),
						}}
						placeholder="Level important"
					/>
					<div
						className="designing-form-component-dealine"
						style={{ display: "flex", flexDirection: "column" }}
					>
						<p>Start Day</p>
						<input
							// className="designing-form-component-dealine"
							type="date"
							ref={startDayRef}
							name="startDay"
							data-date-form="DD/MM/YYYY"
							min={new Date().toJSON().slice(0, 10)}
						/>
					</div>

					<div
						className="designing-form-component-dealine"
						style={{ display: "flex", flexDirection: "column" }}
					>
						<p>Deadline</p>
						<input
							// className="designing-form-component-dealine"
							type="date"
							ref={deadlineRef}
							name="deadline"
							data-date-form="DD/MM/YYYY"
							min={new Date().toJSON().slice(0, 10)}
						/>
					</div>

					<textarea
						rows={2}
						cols={20}
						className="designing-form-component-description"
						placeholder="Description"
						name="decription"
						ref={descripRef}
					/>
					<button onClick={handleSubmit} className="todo-button">
						Add todo
					</button>
				</div>
			)}
		</form>
	);
}

export default TodoForm;
