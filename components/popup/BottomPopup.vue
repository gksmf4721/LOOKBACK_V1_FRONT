<template>
  <div class="popup-overlay" @click.self="close" v-show="show">
    <transition name="slide-up">
      <div v-if="show" class="popup-content">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
}

/* 팝업 본체 */
.popup-content {
  background: white;
  width: 100%;
  max-width: 500px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 20px;
}

/* 슬라이드 애니메이션 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
