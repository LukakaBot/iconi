<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <BaseProvider>
      <RouterView />
    </BaseProvider>
  </NConfigProvider>
</template>

<style scoped></style>
