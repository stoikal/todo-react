import { Todo } from '../types/todo'
import TodoItem from './TodoItem'

type Props = {
  items: Todo[]
  onItemClick: (todo: Todo) => void
  onItemDelete: (todo: Todo) => void
}

export default function TodoList ({ items, onItemClick, onItemDelete }: Props) {
  return (
    <ul m="b-8">
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          value={todo}
          onItemClick={onItemClick}
          onItemDelete={onItemDelete}
        />
      ))}
    </ul>
  )
}
