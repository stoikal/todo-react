import { useCallback, useEffect, useState } from 'react'
import todoService from './services/todos'
import { Todo } from './types/todo'
import TodoList from './components/TodoList'

function App () {
  const [todos, setTodos] = useState<Todo[]>([])

  const loadData = useCallback(async () => {
    const data = await todoService.getAll()
    setTodos(data)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleItemClick = async (todo: Todo) => {
    await todoService.setIsDone(todo.id, !todo.is_done)
    loadData()
  }

  const notDoneTodos = todos.filter(t => !t.is_done)
  const doneTodos = todos.filter(t => t.is_done)

  return (
    <div
      max-w="sm"
      m="x-auto"
    >
      <h2 font="bold" text="lg" m="b-2">Todo</h2>
      <TodoList
        items={notDoneTodos}
        onItemClick={handleItemClick}
      />

      <div m="b-6">
        <button
          border="~"
          bg="transparent"
          w="full"
        >
          +
        </button>
      </div>

      {
        !!doneTodos.length && (
          <h2 font="bold" text="lg" m="b-2">Done</h2>
        )
      }
      <TodoList
        items={doneTodos}
        onItemClick={handleItemClick}
      />
    </div>
  )
}

export default App
