import React, { useState, useEffect, useCallback, useRef } from "react";
import {
	EditOutlined,
	DeleteOutlined,
	SearchOutlined,
	FilterOutlined,
	ReloadOutlined,
	SortAscendingOutlined,
	CheckOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../store/TaskFunction";
import { calculate } from "../store/AmountStateTask";

import { Button, Flex, Form, Modal, Table, Input, DatePicker } from "antd";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";
import Select from "react-select";

function TodoList() {
	const dispatch = useDispatch();
	const todoList = useSelector((state) => state.task);
	const amountTask1 = useSelector((state) => state.AmountStateTask);
	const [currentTask, setCurrentTask] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalOpenFilter, setIsModalOpenFilter] = useState(false);

	const useStateTaskRef = useRef(null);
	const useImportanceLevelRef = useRef(null);
	const useDeadlineRef = useRef(null);

	const onChangeForDealineFilter = (date, dateString) => {
		useDeadlineRef.current = dateString.split("-").reverse().join("-");
		console.log(useDeadlineRef.current);
	};

	const filterTaskForThreeOption = () => {
		console.log(useImportanceLevelRef.current);
		console.log(useStateTaskRef.current);
		console.log(useDeadlineRef.current);

		const taskClone = [...todoList].filter((task) => {
			if (
				useImportanceLevelRef.current?.target === "Default" &&
				useStateTaskRef.current === "Default" &&
				useDeadlineRef.current === null
			)
				return true;

			return useImportanceLevelRef.current?.priority
				? task.option.priority === useImportanceLevelRef.current?.priority
				: true && useStateTaskRef?.current
				? task.stateTask === useStateTaskRef.current
				: true && useDeadlineRef?.current
				? task.deadline === useDeadlineRef.current
				: true;
		});

		setCurrentTask(taskClone);
	};

	useEffect(() => {
		dispatch(calculate(todoList));
		setCurrentTask([...todoList]);
		console.log("useEffect");
	}, [todoList]);

	// use Redux to remove todo
	const removeTodoAction = (id) => {
		console.log(id);
		dispatch(
			removeTodo({
				id: id,
			})
		);
		return;
	};

	// find task function
	const findTask = useCallback(
		(keyword) => {
			if (keyword === "") {
				setCurrentTask([...todoList]);
				return;
			}
			const taskClone = [...currentTask];
			const tasksClone = taskClone.filter((task) => {
				return task.text.toLowerCase().includes(keyword.toLowerCase());
			});
			setCurrentTask(tasksClone);
		},
		[currentTask]
	);

	// sap xep muc do quan trong cua dau viec
	const sortTask = () => {
		const taskClone = [...currentTask];
		const tasksClone = taskClone.sort((a, b) => {
			return a.option.priority - b.option.priority;
		});

		setCurrentTask(tasksClone);
	};

	const dataSource = currentTask.map((task) => {
		return {
			key: task.id,
			task: task.text,
			stateTask: task.stateTask,
			target: task.option.target,
			startDay: task.date,
			deadline: task.deadline,
			description: task.description,
		};
	});

	const options = [
		{ label: "Default", value: { target: "Default", priority: 0 } },
		{ label: "In Day", value: { target: "InDay", priority: 1 } },
		{ label: "In Three Day", value: { target: "InThreeDay", priority: 2 } },
		{ label: "In Week", value: { target: "InWeek", priority: 3 } },
		{ label: "In Two Weeks", value: { target: "InTwoWeeks", priority: 4 } },
		{ label: "In Month", value: { target: "InMonth", priority: 5 } },
	];

	const StateTask = [
		{ label: "Default", value: "Default" },
		{ label: "UnFinished", value: "UnFinished" },
		{ label: "Doing", value: "Doing" },
		{ label: "Finished", value: "Finished" },
		{ label: "Caceled", value: "Caceled" },
		{ label: "Expired", value: "Expired" },
	];

	const columns = [
		{
			title: "Tình trạng",
			dataIndex: "stateTask",
			key: "stateTask",
		},
		{
			title: "Nhiệm vụ",
			dataIndex: "task",
			key: "task",
		},
		{
			title: "Mức độ quan trọng",
			dataIndex: "target",
			key: "target",
		},
		{
			title: "Ngày tạo",
			dataIndex: "startDay",
			key: "startDay",
		},
		{
			title: "Deadline",
			dataIndex: "deadline",
			key: "deadline",
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Flex style={{ gap: "1rem" }}>
					<Link
						to={`/DoAnITMC/edit-task/${record.key}`}
						style={{ textDecoration: "none", color: "black" }}
						state={record}
					>
						<EditOutlined />
					</Link>
					<DeleteOutlined
						onClick={() => {
							removeTodoAction(record.key);
						}}
					/>
				</Flex>
			),
		},
	];

	return (
		<>
			<h1 style={{ margin: "1rem" }}>Quản lý công việc</h1>
			<Search
				placeholder="Tìm kiếm theo tiêu đề công việc"
				enterButton={<SearchOutlined />}
				size="middle"
				style={{ width: "30%", margin: "0 auto 5% auto" }}
				onPressEnter={(e) => {
					findTask(e.target.value);
				}}
				onSearch={(value) => {
					findTask(value);
				}}
				onChange={(e) => {
					if (e.target.value === "") {
						setCurrentTask([...todoList]);
					}
				}}
			/>

			<Flex style={{ margin: "0 1rem", gap: "35rem" }}>
				<Flex style={{ gap: "5px" }}>
					<Button
						style={{ fontWeight: "bold" }}
						onClick={() => setIsModalOpenFilter(true)}
					>
						{<FilterOutlined style={{ fontSize: "16px" }} />} Filter
					</Button>
					<Button style={{ fontWeight: "bold" }} onClick={() => sortTask()}>
						{<SortAscendingOutlined style={{ fontSize: "16px" }} />}Sort
					</Button>
					<Button
						onClick={() => {
							setIsModalOpen(true);
						}}
						style={{ fontWeight: "bold" }}
					>
						{<CheckOutlined style={{ fontSize: "16px" }} />}Check
					</Button>
					<Button
						style={{ fontWeight: "bold" }}
						onClick={() => {
							setCurrentTask([...todoList]);
						}}
					>
						{<ReloadOutlined style={{ fontSize: "16px" }} />}
					</Button>
				</Flex>

				<Link to="add-task" style={{ textDecoration: "none" }}>
					<Button
						style={{ fontWeight: "bold" }}
						onClick={() => {
							setIsModalOpen(true);
						}}
					>
						+ Add
					</Button>
				</Link>
			</Flex>
			<Table
				dataSource={dataSource}
				columns={columns}
				style={{ margin: "1rem" }}
			/>
			<Modal
				title="Check"
				open={isModalOpen}
				onOk={() => {
					setIsModalOpen(false);
				}}
				onCancel={() => {
					setIsModalOpen(false);
				}}
			>
				<p>UnFinished: {amountTask1.UnFinished}</p>
				<p>Doing: {amountTask1.Doing}</p>
				<p>Finished: {amountTask1.Finished}</p>
				<p>Caceled: {amountTask1.Caceled}</p>
				<p>Expired: {amountTask1.Expired}</p>
			</Modal>
			{/* write for me a modal for filter task  */}
			<Modal
				title="Filter"
				open={isModalOpenFilter}
				onOk={() => {
					{
						setIsModalOpenFilter(false);
						filterTaskForThreeOption();
					}
				}}
				onCancel={() => {
					setIsModalOpenFilter(false);
				}}
			>
				{/* Write a form have 3 input */}
				{/* 1. input for filter by Importantn level */}
				{/* 2. input for filter by deadline */}
				{/* 3. input for filter by stateTask */}

				<Form>
					<Form.Item label="Lọc theo mức độ quan trọng">
						<Select
							options={options}
							onChange={(e) => (useImportanceLevelRef.current = e.value)}
							defaultValue={options[0]}
						/>
					</Form.Item>
					<Form.Item label="Lọc theo trạng thái">
						<Select
							options={StateTask}
							onChange={(e) => (useStateTaskRef.current = e.value)}
							defaultValue={options[0]}
						/>
					</Form.Item>
					<Form.Item label="Lọc theo thời gian hoàn thành">
						<DatePicker
							format={"DD-MM-YYYY"}
							onChange={onChangeForDealineFilter}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

export default TodoList;
