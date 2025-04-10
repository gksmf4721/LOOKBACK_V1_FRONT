<template>
  <div>
    <header class="default-header">
      <div class="default-div">
        <div>
          <div class="back-btn-box-text">
            <button @click="() => emits('onMove', 2)"
                    class="back-btn"
            ><img src="@/assets/icons/chevron-left.svg" alt="">
            </button>
            <div class="default-back-title">순서편집</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Exercise Details Section -->
    <div class="record-section margin-top-20">
      <!-- 운동 리스트 -->
      <draggable v-model="localItems"
                 item-key="id"
                 handle=".drag-handle-ord"
                 @end="onDragEnd"
                 class="exercise-list"
                 id="exercise-list">
        <!-- 반복되는 운동 상세 -->
        <template #item="{ element }">
          <div class="record-details-ord exercise-section" data-id="1">
            <div class="drag-handle-ord">
              <img src="@/assets/icons/hamburger.svg" alt="">
            </div>
            <div class="details-header-ord">
              <span class="details-title-ord">{{element.exerciseName}}</span>
              <span class="exercise-pagination toggle-details-btn">
                <button type="button" class="default-none-btn">삭제</button>
              </span>
            </div>
          </div>
        </template>


      </draggable>
    </div>

    <!-- 하단 고정 푸터 -->
    <footer class="fixed-footer-btn">
      <button @click="() => emits('onMove', 2)"
              type="button"
              class="create-record-btn"
      > 편집 완료
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
const props = defineProps({
  selectedExerciseRecords : {
    type: Array,
    default: () => []
  }
})

const localItems = ref([...props.selectedExerciseRecords])

watch(
    () => props.selectedExerciseRecord,
    (val) => (localItems.value = [...val])
)

const emits = defineEmits<{
  (e: 'update:selectedExerciseRecords', value: typeof props.selectedExerciseRecord): void
  (e: 'onMove', value:number ): void
}>()

function onDragEnd () {
  // 배열 순서대로 ord 값 재부여
  localItems.value.forEach((item, idx) => {
    item.ord = idx + 1        // 1,2,3 …
  })
  emits('update:selectedExerciseRecords', localItems.value)
}

</script>

<style scoped>
.record-details-ord{
  display:flex;align-items:center;justify-content:space-between;
  padding:15px;margin-bottom:10px;border:1px solid #ddd;border-radius:8px
}
.drag-handle-ord{cursor:grab;margin-right:10px}
</style>