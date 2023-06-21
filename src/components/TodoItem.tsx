import { Todo } from '../types/todo'

type Props = {
  value: Todo
  onItemClick: (todo: Todo) => void
}

export default function TodoItem ({ value, onItemClick }: Props) {
  const handleItemClick = (todo: Todo) => () => {
    onItemClick(todo)
  }

  return (
    <li m="b-2">
      <button
        bg="transparent"
        text="lg"
        onClick={handleItemClick(value)}
      >
        { value.is_done ? '🗹' : '☐' }
      </button>
      &nbsp;
      <span
        className={value.is_done ? 'line-through' : ''}
      >
        {value.content}
      </span>
    </li>
  )
}
