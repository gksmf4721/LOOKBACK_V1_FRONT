<template>
  <div v-if="show" class="modal-overlay">
    <transition name="fade">
      <div class="modal-card">
        <div class="modal-title">{{ title }}</div>
        <div class="modal-desc">{{ message }}</div>
        <div class="modal-actions single">
          <button class="action-btn bold-700" @click="emit('confirm')">확인</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String
})

const emit = defineEmits(['confirm'])

// 바깥 클릭으로 닫히지 않게 close 함수 제거
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-card {
  background: white;
  width: 80%;
  max-width: 360px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  color: #000;
}

.modal-title {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 16px;
  padding: 24px 20px 0;
}

.modal-desc {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-line;
  text-align: left;
  margin-bottom: 24px;
  color: #000;
  padding: 10px 20px;
}

.modal-actions {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 20px 0;
}

.modal-actions.single {
  justify-content: center;
}

.action-btn {
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  color: #000;
  padding: 0 20px;
}
</style>
