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
          <div class="media-box" v-for="item in uploadFiles">
            <div class="media-box" v-if="isVideoFile(item.relativePath)">
              <!-- 동영상 미리보기 -->
              <video
                  :src="`http://localhost:8080${item.relativePath}`"
                  controls
                  width="200"
                  height="auto"
              ></video>
              <button @click="removeFile(item.uuid, ord)"
                      class="delete-btn">x</button>
            </div>
            <div class="media-box" v-else>
              <!-- 이미지 미리보기 -->
              <img :src="`http://localhost:8080${item.relativePath}`" alt="이미지" />
              <button @click="removeFile(item.uuid, ord)"
                      class="delete-btn">x</button>
            </div>
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
  },
  uploadFiles: {
    type: Array,
    default: () => []
  }
})

const isOpen = ref(false);

const emits = defineEmits([
  'update:memo',
  'uploadFile',
  'removeFile'
])

const updateMemo = (e: Event) => {
  const target = e.target as HTMLInputElement
  emits('update:memo', target.value);
}

//파일 업로드
const handleFileUpload = async (e: Event) => {
  emits('uploadFile', e, props.ord);
}

const removeFile = (uuid : string, exerciseRecordOrd : number) => {
  debugger;
  emits('removeFile', uuid, exerciseRecordOrd);
}

// 예: 간단히 확장자로 동영상 여부 판단
function isVideoFile(path: string): boolean {
  const lowerPath = path.toLowerCase()
  return (
      lowerPath.endsWith(".mp4") ||
      lowerPath.endsWith(".mov") ||
      lowerPath.endsWith(".avi") ||
      // 필요 확장자 추가
      false
  )
}


</script>

<style scoped>

</style>