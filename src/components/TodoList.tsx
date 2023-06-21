import { Todo } from '../types/todo'
import TodoItem from './TodoItem'

type Props = {
  items: Todo[]
  onItemClick: (todo: Todo) => void
}

export default function TodoList ({ items, onItemClick }: Props) {
  const handleItemClick = (todo: Todo) => {
    onItemClick(todo)
  }

  return (
    <ul>
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          value={todo}
          onItemClick={handleItemClick}
        />
      ))}
    </ul>
  )
}
