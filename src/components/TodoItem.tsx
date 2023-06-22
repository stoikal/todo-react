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
      <span
        className={value.is_done ? 'line-through' : ''}
        flex="grow-1"
        p="x-2"
        truncate="~"
      >
        {value.content}
      </span>
      <button
        type="button"
        bg="transparent"
        onClick={() => onItemDelete(value)}
      >
        <div className="i-ph-trash"></div>
      </button>
    </li>
  )
}
