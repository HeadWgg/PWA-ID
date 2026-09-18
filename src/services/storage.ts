import { openDB } from 'idb'
import type { Identification } from '../types/identification'

const database = openDB('identificacao-digital', 1, {
  upgrade(db) {
    db.createObjectStore('identification')
  },
})

export async function getIdentification(): Promise<Identification | undefined> {
  return (await database).get('identification', 'current')
}

export async function saveIdentification(data: Identification): Promise<void> {
  await (await database).put('identification', data, 'current')
}
