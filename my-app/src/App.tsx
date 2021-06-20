import React, { useState } from 'react';
import TodoList from './TodoList';
import InputForm from './InputForm';
import './App.css';
import { v1 } from 'uuid';

export type TasksType = {
	id: string;
	title: string;
	isDone: boolean;
};
//
export type FilterValuetype = 'all' | 'active' | 'completed';
//

function App() {
	//
	const todoID_1 = v1();
	const todoID_2 = v1();
	//
	let [todoLists, setTodoLists] = useState([
		{ id: todoID_1, title: 'What to learn', filter: 'all' },
		{ id: todoID_2, title: 'What to buy', filter: 'all' },
	]);
	//
	let [tasks, setTasks] = useState({
		[todoID_1]: [
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'HTML', isDone: true },
			{ id: v1(), title: 'CSS', isDone: false },
			{ id: v1(), title: 'React', isDone: true },
			{ id: v1(), title: 'Redux', isDone: false },
			{ id: v1(), title: 'TypeScript', isDone: true },
		],
		[todoID_2]: [
			{ id: v1(), title: 'Bread', isDone: false },
			{ id: v1(), title: 'Chees', isDone: true },
			{ id: v1(), title: 'Cheps', isDone: false },
			{ id: v1(), title: 'shocalate', isDone: true },
		],
	});
	//
	function changeChecked(id: string, bool: boolean, todoID: string) {
		tasks[todoID] = tasks[todoID].map((t) =>
			t.id === id ? { ...t, isDone: bool } : t
		);
		setTasks({ ...tasks });
	}
	//
	function addTask(title: string, todoID: string) {
		const newTask = { id: v1(), title, isDone: false };
		tasks[todoID] = [newTask, ...tasks[todoID]];
		setTasks({ ...tasks });
	}
	//
	function removeTask(id: string, todoID: string) {
		tasks[todoID] = tasks[todoID].filter((f) => {
			if (f.id !== id) {
				return true;
			} else {
				return false;
			}
		});
		setTasks({ ...tasks });
	}
	//
	function filterButton(f: FilterValuetype, todoID: string) {
		let filter = todoLists.map((tl) => {
			if (tl.id === todoID) {
				return { ...tl, filter: f };
			} else {
				return tl;
			}
		});
		setTodoLists(filter);
	}
	//
	function addTodoList(title: string) {
		const todoID = v1();
		const newTodoList = { id: todoID, title, filter: 'all' };
		setTodoLists([newTodoList, ...todoLists]);
		setTasks({ ...tasks, [todoID]: [] });
	}
	//
	function removeTodo(todoID: string) {
		const todo = todoLists.filter((f) => f.id !== todoID);
		setTodoLists(todo);
		delete tasks[todoID];
	}
	//
	function changeSpan(title: string, id: string, todoID: string) {
		tasks[todoID] = tasks[todoID].map((t) => {
			return t.id === id ? { ...t, title } : t;
		});
		setTasks({ ...tasks });
	}
	//
	function editHead(title: string, id: string) {
		const newLogo = todoLists.map((tl) => {
			if (tl.id === id) {
				return { ...tl, title };
			} else {
				return tl;
			}
		});
		setTodoLists(newLogo);
	}
	//
	return (
		<div className='App'>
			<InputForm addItem={addTodoList} />
			{todoLists.map((tl) => {
				function windowFilter() {
					if (tl.filter === 'active') {
						return tasks[tl.id].filter((f) => f.isDone === false);
					}
					if (tl.filter === 'completed') {
						return tasks[tl.id].filter((f) => f.isDone === true);
					} else {
						return tasks[tl.id];
					}
				}
				return (
					<TodoList
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={windowFilter()}
						filterButton={filterButton}
						removeTask={removeTask}
						addTask={addTask}
						changeChecked={changeChecked}
						filter={tl.filter}
						removeTodo={removeTodo}
						changeSpan={changeSpan}
						editHead={editHead}
					/>
				);
			})}
		</div>
	);
}

export default App;
