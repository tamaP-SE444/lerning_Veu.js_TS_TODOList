import { Todo } from '@/todo'
const STORAGE_KEY = 'todos-vuejs-demo'

interface TodoStorage {
  fetch (): Todo[];
  save (todos: Todo[]): void;
  uid: number;
}

export const todoStorage: TodoStorage = {
  uid: 0,
  fetch () {
    const todos = JSON.parse( localStorage.getItem(STORAGE_KEY) || '[]') as Todo[]
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
