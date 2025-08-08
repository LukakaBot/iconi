import type { IconifyMetaDataCollection } from '@iconify/json'
import type { IconifyJSON } from '@iconify/types'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const iconifyDir = path.resolve(__dirname, '../node_modules/@iconify/json')
const publicDir = path.resolve(__dirname, '../public')
const dataDir = path.resolve(__dirname, '../src/data')

function extractValues<T extends object, K extends keyof T>(keys: K[], obj: T): { [P in K]: T[P] } {
  const result = {} as { [P in K]: T[P] }

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }

  return result
}

async function prepare() {
  const rawCollections = await fs.readJSON(path.join(iconifyDir, 'collections.json')) as unknown as IconifyMetaDataCollection

  const collectionsDir = path.resolve(__dirname, '../public/collections')
  await fs.ensureDir(collectionsDir)

  const collections = Object
    .entries(rawCollections)
    .map(([id, value]) => ({ ...value, id }))
    .filter(value => value.hidden !== true)

  const jsonCollections = await Promise.all(
    collections.map(async (collection) => {
      const json = await fs.readJSON(path.join(iconifyDir, 'json', `${collection.id}.json`)) as unknown as IconifyJSON
      const icons = Object.keys(json.icons)
      const categories = json.categories
      let sampleIcons = icons.slice(0, 9)
      const prepacked = {
        prefix: json.prefix,
        width: json.width,
        height: json.height,
        icons: extractValues(sampleIcons, json.icons),
      }
      const meta = { ...collection, icons, categories, sampleIcons, prepacked }

      const rawFilePath = path.join(collectionsDir, `${collection.id}.json`)
      const metaFilePath = path.join(collectionsDir, `${collection.id}-meta.json`)

      await fs.writeJSON(rawFilePath, json)
      await fs.writeJSON(metaFilePath, meta)

      if (collection.id === 'logos') {
        sampleIcons = [
          'vue',
          'vitejs',
          'vitest',
          'rollupjs',
          'github-icon',
          'eslint',
          'esbuild',
          'typescript-icon',
          'netlify-icon',
        ]
      }

      if (['flag', 'flagpack', 'cif', 'fa', 'fontisto', 'et', 'ps'].includes(collection.id)) {
        sampleIcons = icons.slice(0, 6)
      }

      return meta
    }),
  )

  await fs.writeJSON(path.join(publicDir, 'collections-meta.json'), jsonCollections)
  await fs.writeJSON(path.join(dataDir, 'collections-info.json'), collections)
}

prepare()
