<script setup lang="ts">
import type { AppIconProps } from './types'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<AppIconProps>(), {
  color: 'currentColor',
  size: 16,
})

const isLocalIcon = computed(() => props.icon.startsWith('icon-'))

const iconName = computed(() => `#svg-${props.icon}`)

const iconStyle = computed(() => ({
  color: props.color,
}))
</script>

<template>
  <template v-if="isLocalIcon">
    <svg :style="iconStyle" :width="size" :height="size" aria-hidden="true">
      <use :xlink:href="iconName" :fill="color" />
    </svg>
  </template>
  <template v-else>
    <Icon :icon="icon" :width="size" :height="size" :color="color" />
  </template>
</template>
