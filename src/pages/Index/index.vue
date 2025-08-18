<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { categories, collections } from '@/data'

const categorySearch = ref('')

const categorized = ref<CollectionCategoryInfo[]>([])

const noCollection = computed(() => categorized.value.every(category => !category.collections.length))

let timer: NodeJS.Timeout | null = null

function getIconData(search?: string): CollectionCategoryInfo[] {
  if (search) {
    return [
      {
        name: 'Result',
        type: 'result',
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
    return categories.map(category => ({
      name: category,
      type: 'normal',
      collections: collections.filter(collection => collection.category === category),
    }))
  }
}

function handleSearchCategory(value: string) {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    timer = null
    categorized.value = getIconData(value)
  }, 300)
}

function init() {
  categorized.value = getIconData()
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
        <div class="grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))]" grid gap2 py-2>
          <RouterLink
            v-for="collection in category.collections" :key="collection.id" grid="~ cols-[1fr_90px] gap2"
            border="1 solid gray-300" color-base hover="text-[var(--primary-color)] border-[var(--primary-color)]"
            translate-all translate-z-0 cursor-pointer p3 :to="`/collection/${collection.id}`"
          >
            <div>
              <p text-lg leading-5>
                {{ collection.name }}
              </p>
              <div flex="~ col auto" text-xs op50>
                <span>{{ collection.author?.name }}</span>
                <span>{{ collection.license?.title }}</span>
                <span>{{ collection.total }} icons</span>
              </div>
            </div>
            <div flex="~ wrap items-center justify-center" text-xl>
              <Icon v-for="icon in collection.sampleIcons" :key="icon" m1 :icon="`${collection.id}:${icon}`" />
            </div>
          </RouterLink>
        </div>
      </template>
    </n-el>
    <n-empty v-if="noCollection" description="你什么也找不到" />
  </div>
</template>

<style scoped></style>
