import { useCallback, useEffect, useState } from 'react'
import todoService from './services/todos'
import { Todo } from './types/todo'

function App () {
  const [todos, setTodos] = useState<Todo[]>([])

  const loadData = useCallback(() => {
    todoService
      .list()
      .then(data => {
        setTodos(data)
      })
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const toggleLocalDone = (todo: Todo) => {
    setTodos(prev => {
      const foundIndex = prev.findIndex(item => item.id === todo.id)

      if (foundIndex === -1) return prev

      return [
        ...prev.slice(0, foundIndex),
        {
          ...prev[foundIndex],
          is_done: !todo.is_done
        },
        ...prev.slice(foundIndex + 1)
      ]
    })
  }

  const handleItemClick = (todo: Todo) => () => {
    toggleLocalDone(todo)
    todoService
      .setDone(todo.id, !todo.is_done)
  }

  const notDoneTodos = todos.filter(t => !t.is_done)
  const doneTodos = todos.filter(t => t.is_done)

  return (
    <div
      max-w="screen-sm"
      m="x-auto"
    >
      <h2>Todo</h2>
      <ul m="b-6">
        {notDoneTodos.map((todo) => (
          <li key={todo.id}>
            <button
              className="bg-transparent"
              onClick={handleItemClick(todo)}
            >
              ☐
            </button>
             &nbsp;
            {todo.content}
          </li>
        ))}
      </ul>

      {
        !!doneTodos.length && (
          <h2>Done</h2>
        )
      }
      <ul>
        {doneTodos.map((todo) => (
          <li key={todo.id}>
            <button
              className="bg-transparent"
              onClick={handleItemClick(todo)}
            >
              🗹
            </button>
             &nbsp;
            <span
              className="line-through"
            >
              {todo.content}
             </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
