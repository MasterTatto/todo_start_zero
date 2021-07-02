import React, {useState} from 'react';
import { v1 } from 'uuid';
import TodoList from './TodoList';
import './App.css';
import InputForm from './InputForm';
export type TasksType = {
	id: string;
	title: string;
	isDone: boolean;
};
export type FilterType = 'all' | 'active' | 'completed';
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
			{ id: v1(), title: 'css', isDone: true },
			{ id: v1(), title: 'html', isDone: true },
			{ id: v1(), title: 'react', isDone: true },
			{ id: v1(), title: 'redux', isDone: false },
			{ id: v1(), title: 'ui-material', isDone: false },
		],
		[todoID_2]: [
			{ id: v1(), title: 'bread', isDone: true },
			{ id: v1(), title: 'milk', isDone: false },
			{ id: v1(), title: 'chees', isDone: true },
		],
	});
	//
	function changeTodoTitle(title: string, id: string) {
		const newTitle = todoLists.map((t) => (t.id === id ? { ...t, title } : t));
		setTodoLists(newTitle);
	}
	//
	function changeSpan(title: string, todoID: string, id: string) {
		tasks[todoID] = tasks[todoID].map((t) =>
			t.id === id ? { ...t, title } : t
		);
		setTasks({ ...tasks });
	}
	//
	function addButtonFilter(f: FilterType, todoID: string) {
		const newFilter = todoLists.map((t) =>
			t.id === todoID ? { ...t, filter: f } : t
		);
		setTodoLists(newFilter);
	}
	//
	function removeTask(id: string, todoId: string) {
		tasks[todoId] = tasks[todoId].filter((f) => {
			if (f.id !== id) {
				return true;
			} else {
				return false;
			}
		});
		setTasks({ ...tasks });
	}
	//
	function addTask(title: string, todoId: string) {
		const newTasks = { id: v1(), title, isDone: false };
		tasks[todoId] = [newTasks, ...tasks[todoId]];
		setTasks({ ...tasks });
	}
	//
	function checkBox(id: string, bool: boolean, todoId: string) {
		tasks[todoId] = tasks[todoId].map((t) =>
			t.id === id ? { ...t, isDone: bool } : t
		);
		setTasks({ ...tasks });
	}
	//
	function addTodoList(title: string) {
		const todoID = v1();
		const newTodoList = { id: todoID, title, filter: 'all' };
		setTodoLists([newTodoList, ...todoLists]);
		setTasks({ ...tasks, [todoID]: [] });
	}
	//
	function removeTodoList(id: string) {
		const remove = todoLists.filter((f) => {
			if (f.id !== id) {
				return true;
			} else {
				return false;
			}
		});
		setTodoLists(remove);
	}
	//
	return (
		<div className='App'>
			<InputForm addItem={addTodoList} />
			{todoLists.map((tl) => {
				function windowTasks() {
					if (tl.filter === 'completed') {
						return tasks[tl.id].filter((f) => f.isDone === true);
					}
					if (tl.filter === 'active') {
						return tasks[tl.id].filter((f) => f.isDone === false);
					} else {
						return tasks[tl.id];
					}
				}
				return (
					<TodoList
						tasks={windowTasks()}
						addButtonFilter={addButtonFilter}
						removeTask={removeTask}
						title={tl.title}
						addTask={addTask}
						checkBox={checkBox}
						filter={tl.filter}
						id={tl.id}
						key={tl.id}
						removeTodoList={removeTodoList}
						changeSpan={changeSpan}
						changeTodoTitle={changeTodoTitle}
					/>
				);
			})}
		</div>
	);
}

export default App;
