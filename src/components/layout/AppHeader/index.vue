<script setup lang="ts">
function handleOpenGithub() {
  window.open('https://github.com/LukakaBot/iconi', '_blank')
}
</script>

<template>
  <header className="sticky top-0 z-30 border-b border-b-dashed bg-white">
    <div className="container-wrapper flex justify-between items-center gap-2 text-base font-semibold">
      <div class="flex items-center gap-4 text-xl">
        <p>Iconī</p>
      </div>
      <div class="flex items-center gap-4">
        <n-button text @click="handleOpenGithub">
          <AppIcon icon="mdi:github" :size="30" />
        </n-button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
