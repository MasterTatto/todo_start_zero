import React, { useState } from 'react';
import { v1 } from 'uuid';
import TodoList from './TodoList';
import './App.css';
export type TasksType = {
	id: string;
	title: string;
	isDone: boolean;
};
export type FilterType = 'all' | 'active' | 'completed';
function App() {
	let [filter, setFilter] = useState('all');
	//
	let [tasks, setTasks] = useState<Array<TasksType>>([
		{ id: v1(), title: 'css', isDone: true },
		{ id: v1(), title: 'html', isDone: true },
		{ id: v1(), title: 'react', isDone: true },
		{ id: v1(), title: 'redux', isDone: false },
		{ id: v1(), title: 'ui-material', isDone: false },
	]);
	//
	function windowTasks() {
		if (filter === 'completed') {
			return tasks.filter((f) => f.isDone === true);
		}
		if (filter === 'active') {
			return tasks.filter((f) => f.isDone === false);
		} else {
			return tasks;
		}
	}
	//
	function addButtonFilter(f: FilterType) {
		setFilter(f);
	}
	//
	function removeTask(id: string) {
		const remove = tasks.filter((f) => {
			if (f.id !== id) {
				return true;
			} else {
				return false;
			}
		});
		setTasks(remove);
	}
	//
	function addTask(title: string) {
		const newTasks = { id: v1(), title, isDone: false };
		const newTask = [newTasks, ...tasks];
		setTasks(newTask);
	}
	//
	function checkBox(id: string, bool: boolean) {
		const check = tasks.map((t) => (t.id === id ? { ...t, isDone: bool } : t));
		setTasks(check);
	}
	//
	return (
		<div className='App'>
			<TodoList
				tasks={windowTasks()}
				addButtonFilter={addButtonFilter}
				removeTask={removeTask}
				title={'What to learn'}
				addTask={addTask}
				checkBox={checkBox}
				filter={filter}
			/>
		</div>
	);
}

export default App;
