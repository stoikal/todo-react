import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react'
import todoService from './services/todos'
import { Todo } from './types/todo'
import TodoList from './components/TodoList'

function App () {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

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

  const handleItemDelete = async (todo: Todo) => {
    await todoService.delete(todo.id)
    loadData()
  }

  const handleCreate = async () => {
    await todoService.create({
      title: input,
      parent: null,
      is_done: false
    })
    setInput('')
    loadData()
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreate()
    }
  }

  const notDoneTodos = todos.filter(t => !t.is_done)
  const doneTodos = todos.filter(t => t.is_done)

  return (
    <div
      max-w="md"
      h="full"
      m="x-auto"
      p="4"
      relative="~"
    >
      <h2 font="bold" text="lg" m="b-2">Todo</h2>
      <TodoList
        items={notDoneTodos}
        onItemClick={handleItemClick}
        onItemDelete={handleItemDelete}
      />

      {
        !!doneTodos.length && (
          <h2 font="bold" text="lg" m="b-2">Done</h2>
        )
      }
      <TodoList
        items={doneTodos}
        onItemClick={handleItemClick}
        onItemDelete={handleItemDelete}
      />

      <div
        flex="~"
        w="full"
      >
        <input
          value={input}
          type="text"
          bg="gray-300"
          rounded="l"
          p="x-2 y-1"
          text="black"
          flex="grow-1"
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          bg="blue-400 hover:blue-500"
          text="slate-800"
          p="2"
          rounded="r"
          onClick={handleCreate}
        >
          <div className="i-ph-plus-bold">

          </div>
        </button>
      </div>
    </div>
  )
}

export default App
