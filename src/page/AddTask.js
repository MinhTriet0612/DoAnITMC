import React, { useRef, useState } from "react";
import { addTodo } from "../store/TaskFunction";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, DatePicker, Flex } from "antd";
import { Link } from "react-router-dom";
import Select from "react-select";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Option } = Select;
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

const AddTaskPage = () => {
	const textRef = useRef("");
	const importanceLevelRef = useRef("");
	const startDayRef = useRef("");
	const deadlineRef = useRef("");
	const descriptionRef = useRef("");
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
			addTodo({
				...values,
				stateTask: "UnFinished",
			})
		);
		console.log(values);
	};

	return (
		<>
			<h1 style={{ textAlign: "center", marginBottom: "5%" }}>Add Task</h1>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				style={{ margin: "0 auto " }}
			>
				<Form.Item
					label="Task Name"
					name="taskName"
					rules={[
						{
							required: true,
							message: "Please input your task name!",
						},
					]}
				>
					<Input ref={textRef} />
				</Form.Item>

				<Form.Item
					label="Importance Level"
					name="importanceLevel"
					rules={[
						{
							required: true,
							message: "Please input your option!",
						},
					]}
				>
					<Select
						placeholder="Select a option and change input text above"
						onChange={(e) => {
							importanceLevelRef.current = e;
						}}
						options={options}
					/>
				</Form.Item>

				<Form.Item
					label="Date Picker"
					name="startDay"
					rules={[
						{
							required: true,
							message: "Please input your start day!",
						},
					]}
				>
					<RangePicker format={"DD-MM-YYYY"} onChange={onChange} />
				</Form.Item>

				<Form.Item label="Description" name="description">
					<Input ref={descriptionRef} />
				</Form.Item>

				<Flex style={{ justifyContent: "center", gap: "1rem" }}>
					{contextHolder}
					<Button
						type="primary"
						htmlType="submit"
						onClick={() => {
							if (
								!taskName.includes(textRef.current.input.value.toLowerCase()) &&
								textRef.current.input.value.trim() !== ""
							) {
								openNotification("Success", "Add task successfully!");
								onSubmit({
									id: Math.floor(Math.random() * 10000),
									text: textRef.current.input.value,
									option: importanceLevelRef.current.value,
									date: startDayRef.current,
									deadline: deadlineRef.current,
									stateTask: "UnFinished",
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

export default AddTaskPage;
