<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <AppProvider>
      <AppHeader />
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped></style>
