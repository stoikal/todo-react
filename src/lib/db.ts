type Options = {
  dbName: string
  dbVersion: number
  storeName: string
}

export const openDB = (options: Options) => new Promise<IDBDatabase>((resolve, reject) => {
  const {
    dbName,
    dbVersion,
    storeName
  } = options

  const request = window.indexedDB.open(dbName, dbVersion)

  request.onerror = () => {
    reject(new Error('Database error'))
  }

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result
    const objectStoreNames = db.objectStoreNames

    if (!objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
    }
  }

  request.onsuccess = (event) => {
    const db = (event.target as IDBOpenDBRequest).result

    resolve(db)
  }
})
