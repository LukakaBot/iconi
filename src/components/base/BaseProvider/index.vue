<script setup lang="ts">
</script>

<template>
  <n-modal-provider>
    <n-dialog-provider>
      <n-message-provider>
        <n-notification-provider>
          <slot />
        </n-notification-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-modal-provider>
</template>
