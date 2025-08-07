import type { IconifyMetaDataCollection } from '@iconify/json'
import type { IconifyJSON } from '@iconify/types'
// import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

async function prepare() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const dir = path.resolve(__dirname, '../node_modules/@iconify/json')
  const raw = await fs.readJson(path.resolve(dir, 'collections.json'), 'utf-8') as unknown as IconifyMetaDataCollection

  const collectionsDir = path.resolve(__dirname, '../public/collections')

  const collections = Object
    .entries(raw)
    .map(([id, v]) => ({ ...v, id }))
    .filter(v => v.hidden !== true)

  const collectionJSONs = await Promise.all(
    collections.map(async (collection) => {
      const json = await fs.readJson(path.resolve(dir, 'json', `${collection.id}.json`), 'utf-8') as unknown as IconifyJSON
      const icons = Object.keys(json.icons)

      console.log(json.icons)
      console.log(icons)
      return {
        json,
      }
    }),
  )

  console.log(collectionsDir)
  console.log(collections)
  console.log(collectionJSONs)
}

prepare()
