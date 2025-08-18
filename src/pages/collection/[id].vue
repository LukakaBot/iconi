<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { getCollectionMeta } from '@/data'

interface Props {
  id: string
}

const props = defineProps<Props>()

const size = ref(200)

const collectionMeta = ref<CollectionMeta | null>(null)

async function getData() {
  collectionMeta.value = await getCollectionMeta(props.id)
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div>
    <div flex="~ wrap justify-center items-center">
      <div v-for="icon in collectionMeta?.icons.slice(0, size)" :key="icon">
        <Icon
          :key="icon"
          :icon="`${collectionMeta?.id}:${icon}`"
          :cache="true"
          m1 text-2xl
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
