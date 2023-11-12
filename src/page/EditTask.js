import React, { useRef } from "react";
import { updateTodoTask } from "../store/TaskFunction";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, DatePicker, Flex } from "antd";
import { Link, useLocation } from "react-router-dom";
import Select from "react-select";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

const { RangePicker } = DatePicker;
const options = [
	{ label: "In Day", value: { target: "InDay", priority: 1 } },
	{ label: "In Three Day", value: { target: "InThreeDay", priority: 2 } },
	{ label: "In Week", value: { target: "InWeek", priority: 3 } },
	{ label: "In Two Weeks", value: { target: "InTwoWeeks", priority: 4 } },
	{ label: "In Month", value: { target: "InMonth", priority: 5 } },
];

const StateTask = [
	{ label: "UnFinished", value: "UnFinished" },
	{ label: "Doing", value: "Doing" },
	{ label: "Finished", value: "Finished" },
	{ label: "Canceled", value: "celed" },
	{ label: "Expired", value: "Expired" },
];

const EditTaskPage = () => {
	const { state } = useLocation();
	console.log(state);
	const textRef = useRef(null);
	const stateTaskRef = useRef(null);
	const importanceLevelRef = useRef(null);
	const startDayRef = useRef(null);
	const deadlineRef = useRef(null);
	const descriptionRef = useRef(null);
	const dispatch = useDispatch();
	const todoList = useSelector((state) => state.task);
	const taskName = todoList.map((task) => task.text.toLowerCase());

	// Variable for notification
	const [api, contextHolder] = notification.useNotification();
	const openNotification = (message, description) => {
		api.open({
			message: message,
			description: description,
			icon: (
				<SmileOutlined
					style={{
						color: "#108ee9",
					}}
				/>
			),
		});
	};

	const onChange = (date, dateString) => {
		// console.log(date, dateString);
		// convert into dd-mm-yyyy
		startDayRef.current = dateString[0].split("-").reverse().join("-");
		deadlineRef.current = dateString[1].split("-").reverse().join("-");
	};

	const onSubmit = (values) => {
		dispatch(
			updateTodoTask({
				...values,
				stateTask: stateTaskRef.current?.value || state.stateTask,
			})
		);
		// console.log({
		// 	...values,
		// 	stateTask: stateTaskRef.current.value,
		// });
	};

	return (
		<>
			<h1 style={{ textAlign: "center", marginBottom: "5%" }}>Edit Task</h1>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				style={{ margin: "0 auto " }}
			>
				<Form.Item label="State Task" name="stateTask">
					<Select
						onChange={(e) => {
							stateTaskRef.current = e;
							console.log(stateTaskRef.current);
						}}
						options={StateTask}
						placeholder={state.stateTask}
					/>
				</Form.Item>

				<Form.Item label="Task Name" name="taskName">
					<Input
						ref={textRef}
						style={{ textAlign: "center" }}
						placeholder={state.task}
					/>
				</Form.Item>

				<Form.Item label="Importance Level" name="importanceLevel">
					<Select
						onChange={(e) => {
							importanceLevelRef.current = e;
						}}
						options={options}
						placeholder={state.target}
					/>
				</Form.Item>

				<Form.Item label="Date Picker" name="startDay">
					<RangePicker format={"DD-MM-YYYY"} onChange={onChange} />
				</Form.Item>

				<Form.Item label="Description" name="description">
					<Input ref={descriptionRef} placeholder={state.description} />
				</Form.Item>

				<Flex style={{ justifyContent: "center", gap: "1rem" }}>
					{contextHolder}
					<Button
						type="primary"
						htmlType="submit"
						onClick={() => {
							if (
								!taskName.includes(textRef.current.input.value.toLowerCase())
							) {
								openNotification("Success", "Edit task successfully!");
								onSubmit({
									id: state.key,
									text: textRef.current.input.value || state.task,
									option: importanceLevelRef.current?.value || state.target,
									date: startDayRef.current,
									deadline: deadlineRef.current,
									description: descriptionRef.current.input.value,
								});
							} else {
								openNotification("Error", "Task name is existed!");
							}
						}}
					>
						Submit
					</Button>

					<Button>
						<Link to="/DoAnITMC" style={{ textDecoration: "none" }}>
							Back
						</Link>
					</Button>
				</Flex>
			</Form>
		</>
	);
};

export default EditTaskPage;
