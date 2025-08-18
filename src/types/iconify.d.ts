export { }

declare global {
  type IconifyInfo = import('@iconify/types').IconifyInfo
  type IconifyJSON = import('@iconify/types').IconifyJSON

  type PresentType = 'result' | 'normal'

  interface CollectionInfo extends IconifyInfo {
    id: string
    url?: string
    sampleIcons?: string[]
    prepacked?: IconifyJSON
  }

  interface CollectionCategoryInfo {
    name: string
    type: PresentType
    collections: CollectionInfo[]
  }

  interface CollectionMeta extends CollectionInfo {
    icons: string[]
    categories?: Record<string, string[]>
    variants?: Record<string, string[]>
  }
}
