import axios from "axios";


const instanceTodo = axios.create({
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

type ResponseType<D> = {
    data: D,
    messages: string[],
    fieldsErrors: [],
    resultCode: number
}

export const APItodoLists = {
    getTodo() {
        return instanceTodo.get<todoListType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instanceTodo.post<ResponseType<{ item: todoListType }>>('todo-lists', {title})
    },
    deleteTodo(id: string) {
        return instanceTodo.delete<ResponseType<{}>>(`todo-lists/${id}`)
    },
    updateTodo(id: string, title: string) {
        return instanceTodo.put<ResponseType<{}>>(`todo-lists/${id}`, {title})
    }
}