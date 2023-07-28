<script setup>
defineProps({
  totalAttemptsCount: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <h2 class="text-center">Guess Numbers</h2>
  <div class="head-legend">
    <span>Your attempts: {{ totalAttemptsCount }}</span>
    <button class="button yellow"
      @click="$emit('cheat')">Cheat</button>
    <button class="button yellow"
      @click="$emit('restart')">Restart</button>
  </div>
</template>

<style scoped>
.head-legend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
</style>