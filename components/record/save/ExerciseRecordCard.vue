<template>
  <!-- 운동 하나-->
  <div class="record-details exercise-section" data-type="weight">
    <div class="details-header">
              <span class="details-title">
                <div>
                  {{title}}
                </div>
                <button class="icon-btn-ellypsis"><img src="@/assets/icons/ellypsis.svg" alt="" /></button>
              </span>
      <span class="exercise-pagination toggle-details-btn">
       <img @click="() => {isOpen = !isOpen}" src="@/assets/icons/chevron-down.svg" alt="" />
    </span>
    </div>
    <div :class="{collapsed: !isOpen}" class="details-contents">
      <slot />
      <!-- Media Section -->
      <div class="media-section">
        <label>사진/영상</label>
        <div class="media-content">
          <div class="media-box">
            <img src="@/assets/images/1.png" alt="이미지" />
            <button class="delete-btn">x</button>
          </div>
          <div class="media-box">
            <img src="@/assets/images/1.png" alt="영상" />
            <button class="delete-btn">x</button>
          </div>
          <div class="media-add">+</div>
        </div>
      </div>

      <!-- Memo Section -->
      <div class="record-section">
        <label for="memo">메모</label>
        <input type="text" id="memo" placeholder="메모를 입력하세요" />
      </div>
    </div>
  </div>
  <!-- 운동 하나-->
</template>

<script setup lang="ts">
const props = defineProps({
  title:{
    type: String,
    default: ""
  }
})

const isOpen = ref(false);

</script>

<style scoped>

</style>