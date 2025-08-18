import collectionInfos from '@/data/collections-info.json'

const publicPath = import.meta.env.VITE_APP_PUBLIC_PATH

const typedCollectionInfos: CollectionInfo[] = collectionInfos as CollectionInfo[]

export const collections = typedCollectionInfos.map(item => Object.freeze(item as unknown as CollectionInfo))

export const categories = [...new Set(collections.map(collection => collection.category).filter(category => category !== null && category !== undefined))]

export async function getCollectionMeta(id: string) {
  try {
    const origin = window.location.origin
    const path = publicPath ? `${publicPath}/collections` : '/collections'
    const response = await fetch(`${origin}${path}/${id}-meta.json`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json() as Promise<CollectionMeta>
  }
  catch (error) {
    console.error(`Failed to fetch collection meta for id: ${id}`, error)
    throw error
  }
}
