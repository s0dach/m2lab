<template>
  <div>
    <UButton label="Открыть" @click="isOpen = true"/>

    <USlideover v-model="isOpen">
      <div class="p-4 flex-1">
        <slot></slot>
      </div>
    </USlideover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  name: 'slide-over'
}
</script>