import { openDB } from '../lib/db'
import { Todo } from '../types/todo'

type Mode = 'readonly' | 'readwrite'

const DB_OPTIONS = {
  dbName: 'todoDb',
  dbVersion: 1,
  storeName: 'todoStore'
}

const getTodoStore = async (mode: Mode = 'readonly') => {
  const db = await openDB(DB_OPTIONS)

  const transaction = db.transaction([DB_OPTIONS.storeName], mode)
  const todoStore = transaction.objectStore(DB_OPTIONS.storeName)

  return todoStore
}

export default {
  async getAll () {
    const store = await getTodoStore()

    return new Promise<Todo[]>((resolve, reject) => {
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  },

  async create (todo: Omit<Todo, 'id'>) {
    const store = await getTodoStore('readwrite')

    return new Promise<IDBValidKey>((resolve, reject) => {
      const request = store.add(todo)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  },

  async patch (id: IDBValidKey, updatedData: Partial<Omit<Todo, 'id'>>) {
    const store = await getTodoStore('readwrite')

    return new Promise<IDBValidKey>((resolve, reject) => {
      const getRequest = store.get(id)

      getRequest.onsuccess = () => {
        const existingEntry = getRequest.result

        Object
          .entries(updatedData)
          .forEach(([key, value]) => {
            existingEntry[key] = value
          })

        const putRequest = store.put(existingEntry)

        putRequest.onsuccess = () => resolve(putRequest.result)
        putRequest.onerror = () => reject(putRequest.error)
      }

      getRequest.onerror = () => reject(getRequest.error)
    })
  },

  async setIsDone (id: number, isDone: boolean) {
    return this.patch(id, { is_done: isDone })
  }
}
