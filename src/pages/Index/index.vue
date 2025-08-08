<script setup lang="ts">
import type { IconifyJSON } from 'iconify-icon'
import { Icon } from '@iconify/vue'
import iconJSON from '@/data/collections-info.json'

type PresentType = 'favorite' | 'recent' | 'normal'

interface CollectionInfo {
  id: string
  name: string
  author?: { name: string, url: string }
  license?: { title: string, spdx: string, url: string }
  url?: string
  samples?: string[]
  category?: string
  palette?: string
  total?: number
  prepacked?: IconifyJSON
  height?: number
  tags?: string[]
}

interface CollectionCategoryInfo {
  name: string
  type: PresentType
  collections: CollectionInfo[]
}

const categorySearch = ref('')

const categorized = ref<CollectionCategoryInfo[]>([])

const collections = iconJSON.map(item => Object.freeze(item as unknown as CollectionInfo))

const categories = [...new Set(collections.map(collection => collection.category).filter(category => category !== null && category !== undefined))]

const noCollection = computed(() => categorized.value.every(category => !category.collections.length))

let timer: NodeJS.Timeout | null = null

function getIconData(search?: string) {
  if (search) {
    return [
      {
        name: 'Result',
        type: 'result' as PresentType,
        collections: collections.filter((collection) => {
          const trimmedSearch = search.trim().toLowerCase()
          return (
            (collection.category?.toLowerCase().includes(trimmedSearch) ?? false)
            || (collection.name?.toLowerCase().includes(trimmedSearch) ?? false)
            || (collection.author?.name.toLowerCase().includes(trimmedSearch) ?? false)
            || (collection.tags?.some(tag => tag.toLowerCase().includes(trimmedSearch)) ?? false)
          )
        }),
      },
    ]
  }
  else {
    return [
      ...categories.map(category => ({
        name: category,
        type: 'normal' as PresentType,
        collections: collections.filter(collection => collection.category === category),
      })),
    ]
  }
}

function handleSearchCategory(value: string) {
  if (timer)
    clearTimeout(timer)
  timer = setTimeout(() => {
    timer = null
    categorized.value = getIconData(value)
  }, 300)
}

function init() {
  categorized.value = getIconData()
  // console.log(categorized.value)
}

onMounted(() => {
  init()
})
</script>

<template>
  <div min-h-screen>
    <n-input v-model:value="categorySearch" placeholder="Search category..." @update:value="handleSearchCategory" />
    <n-el mt4>
      <template v-for="category in categorized" :key="category.name">
        <div mt4 text-lg>
          {{ category.name }}
        </div>
        <div class="grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))]" grid gap2 p2>
          <div
            v-for="collection in category.collections" :key="collection.id" grid="~ cols-[1fr_90px] gap2"
            border="1 solid gray-300" translate-z-0 p3 transition-all
          >
            <div>
              <p text-lg leading-5>
                {{ collection.name }}
              </p>
              <div flex="~ col auto" text="xs gray-500">
                <span>{{ collection.author?.name }}</span>
                <span>{{ collection.license?.title }}</span>
                <span>{{ collection.total }} icons</span>
              </div>
            </div>
            <div flex="~ wrap items-center justify-center" text-xl>
              <Icon v-for="icon in collection.samples" :key="icon" :icon="`${collection.id}:${icon}`" />
            </div>
          </div>
        </div>
      </template>
    </n-el>
    <n-empty v-if="noCollection" description="你什么也找不到" />
  </div>
</template>

<style scoped></style>
