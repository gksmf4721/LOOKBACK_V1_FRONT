<template>
  <!-- 하단 고정 푸터 -->
  <footer class="fixed-footer">
    <div v-for="item in category"
         @click="selectCategory(item.key)"
         class="footer-item"
         :class="{active : selectedCategory == item.key}"
    >{{ item.name }}</div>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps({
  category: {
    type: Array,
    default: [],
  },
  selectedCategory: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['selectCategory'])
const selectCategory = (key: string) => {
  emits('selectCategory', key);
}

</script>

<style scoped>

</style>