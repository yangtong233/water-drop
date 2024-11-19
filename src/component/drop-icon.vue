<script setup lang="ts">
defineProps<{ iconName: String }>()
</script>

<template>
  <svg class="icon" aria-hidden="true">
    <use :href="`#${iconName}`"></use>
  </svg>
</template>

<style scoped>
.icon {
  margin-right: 8px;
}
</style>