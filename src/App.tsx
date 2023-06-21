import { useCallback, useEffect, useState } from 'react'
import todoService from './services/todos'
import { Todo } from './types/todo'
import TodoList from './components/TodoList'

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

  const handleItemClick = (todo: Todo) => {
    toggleLocalDone(todo)
    todoService
      .setDone(todo.id, !todo.is_done)
  }

  const notDoneTodos = todos.filter(t => !t.is_done)
  const doneTodos = todos.filter(t => t.is_done)

  return (
    <div
      max-w="md"
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
