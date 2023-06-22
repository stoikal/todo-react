type Options<T> = {
  dbName: string
  dbVersion: number
  storeName: string
  initialData: T[]
}

export const openDB = <T>(options: Options<T>) => new Promise<IDBDatabase>((resolve, reject) => {
  const {
    dbName,
    dbVersion,
    storeName,
    initialData
  } = options

  const request = window.indexedDB.open(dbName, dbVersion)

  request.onerror = () => {
    reject(new Error('Database error'))
  }

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result
    const objectStoreNames = db.objectStoreNames

    if (!objectStoreNames.contains(storeName)) {
      const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })

      if (initialData.length) {
        initialData.forEach(data => {
          store.add(data)
        })
      }
    }
  }

  request.onsuccess = (event) => {
    const db = (event.target as IDBOpenDBRequest).result

    resolve(db)
  }
})
