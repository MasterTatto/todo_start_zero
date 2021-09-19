import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f5568293-5f8e-4b65-9db2-3f550b4e7fcf'
    }
})

export type todoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
//
export type TasksType = {
    addedDate: string
    deadline: null | string
    description: null | string
    id: string
    order: number
    priority: number
    startDate: null | string
    status: number
    title: string
    todoListId: string
}
//
type getTaskstype = {
    error: string | null,
    items: Array<TasksType>,
    totalCount: number
}
//
type ResponseType<D> = {
    data: D,
    messages: string[],
    fieldsErrors: [],
    resultCode: number
}

export const APItodoLists = {
    getTodo() {
        return instance.get<todoListType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: todoListType }>>('todo-lists', {title})
    },
    deleteTodo(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
    },
    updateTodo(id: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${id}`, {title})
    }
}
///////////////////////////


export const APItasks = {
    getTasks(id: string) {
        return instance.get<getTaskstype>(`todo-lists/${id}/tasks`)
    },
    createTasks(id: string, title: string) {
        return instance.post<ResponseType<{ item: TasksType }>>(`todo-lists/${id}/tasks`, {title})
    },
    deleteTasks(taskID: string, todoID: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todoID}/tasks/${taskID}`)
    },
    updateTask(taskID: string, todoID: string, title: string) {
        return instance.put<ResponseType<{ item: TasksType & { todoList: null | string } }>>(`todo-lists/${todoID}/tasks/${taskID}`, {title})
    }
}