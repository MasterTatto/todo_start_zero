import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import InputForm from './InputForm';
import TodoList, { TasksType } from './TodoList';
export type ButtonTypeFilter = 'all' | 'active' | 'completed';
function App() {
	let [filter, setFilter] = useState<ButtonTypeFilter>('all');
	//
	const todoID_1 = v1();
	const todoID_2 = v1();
	const [todoLists, setTodoLists] = useState([
		{ id: todoID_1, title: 'What to learn', filter: 'all' },
		{ id: todoID_2, title: 'What to buy', filter: 'all' },
	]);
	//
	let [tasks, setTasks] = useState({
		[todoID_1]: [
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'CSS', isDone: true },
			{ id: v1(), title: 'React', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
			{ id: v1(), title: 'Storybook', isDone: false },
		],
		[todoID_2]: [
			{ id: v1(), title: 'milck', isDone: true },
			{ id: v1(), title: 'cheeps', isDone: true },
			{ id: v1(), title: 'beef', isDone: false },
		],
	});
	//
	function addFilterButton(f: ButtonTypeFilter, todoID: string) {
		const newTodoListFilter = todoLists.map((tl) => {
			if (tl.id === todoID) {
				return { ...tl, filter: f };
			} else {
				return tl;
			}
		});
		setTodoLists(newTodoListFilter);
	}
	//

	//
	function removeTasks(id: string, todoID: string) {
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
	function checkedInput(id: string, bool: boolean, todoID: string) {
		tasks[todoID] = tasks[todoID].map((t) =>
			t.id === id ? { ...t, isDone: bool } : t
		);
		setTasks({ ...tasks });
	}
	//
	function addTask(title: string, todoID: string) {
		const newTasks = { id: v1(), title, isDone: false };
		tasks[todoID] = [newTasks, ...tasks[todoID]];
		setTasks({ ...tasks });
	}
	//
	function addTodoList(title: string) {
		const todoID = v1();
		const todoList = { id: todoID, title, filter: 'all' };
		setTodoLists([ todoList,...todoLists]);
		setTasks({ ...tasks, [todoID]: [] });
	}
	//
	return (
		<div className='App'>
			<InputForm addItem={addTodoList} />
			{todoLists.map((tl) => {
				function windowTasks() {
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
						tasks={windowTasks()}
						addFilterButton={addFilterButton}
						removeTasks={removeTasks}
						checkedInput={checkedInput}
						addTask={addTask}
						filter={tl.filter}
					/>
				);
			})}
		</div>
	);
}

export default App;
