import { Todo } from '../types/todo'

type Props = {
  value: Todo
  onItemClick: (todo: Todo) => void
  onItemDelete: (todo: Todo) => void
}

export default function TodoItem ({ value, onItemClick, onItemDelete }: Props) {
  return (
    <li
      m="b-2"
      flex="~"
    >
      <button
        type="button"
        bg="transparent"
        text="lg"
        onClick={() => onItemClick(value)}
      >
        {
          value.is_done
            ? <div className="i-ph-check-circle-fill">s</div>
            : <div className="i-ph-circle-bold">no</div>
        }
      </button>
      <div
        className={value.is_done ? 'line-through' : ''}
        flex="grow-1"
        p="x-2"
        truncate="~"
      >
        <span
          role="button"
          onClick={() => onItemClick(value)}
        >
          {value.title}
        </span>
      </div>
      <button
        type="button"
        bg="transparent"
        p="x-2"
        onClick={() => onItemDelete(value)}
      >
        <div className="i-ph-trash">delete</div>
      </button>
    </li>
  )
}
