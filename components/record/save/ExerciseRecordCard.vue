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
          <!-- 파일 업로드 버튼 -->
          <label class="media-label">
            +
            <input type="file" accept="image/*,video/*" @change="handleFileUpload" hidden />
          </label>
        </div>
      </div>

      <!-- Memo Section -->
      <div class="record-section">
        <label for="memo">메모</label>
        <input type="text"
               id="memo"
               :value="memo"
               @input="updateMemo"
               placeholder="메모를 입력하세요" />
      </div>
    </div>
  </div>
  <!-- 운동 하나-->
</template>

<script setup lang="ts">

import {useFileStore} from "~/store/file";
import {FileType} from "~/types/file";
import ExerciseRecord from "~/components/record/ExerciseRecord.vue";

const fileStore = useFileStore();
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  memo: {
    type: String,
    default: ""
  },
  ord: {
    type: Number,
    default: 0
  }
})

const isOpen = ref(false);

const emits = defineEmits([
  'update:memo',
  'uploadFile'
])

const updateMemo = (e: Event) => {
  const target = e.target as HTMLInputElement
  emits('update:memo', target.value);
}

//파일 업로드
const handleFileUpload = async (e: Event) => {
  emits('uploadFile', e, props.ord);
}

</script>

<style scoped>

</style>